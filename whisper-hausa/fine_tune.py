"""
Voice to Value — Whisper Hausa Fine-Tuning
==========================================
Fine-tunes OpenAI Whisper (small) on Hausa speech data
for agricultural voice-banking applications.

Usage:
    python fine_tune.py [--data_dir ./data/hausa] [--output_dir ./whisper-hausa-finetuned]
                        [--epochs 10] [--batch_size 16] [--learning_rate 1e-5]
"""

import argparse
import os
import torch
from dataclasses import dataclass
from typing import Any, Dict, List, Union

from datasets import load_from_disk
from transformers import (
    WhisperForConditionalGeneration,
    WhisperProcessor,
    WhisperTokenizer,
    WhisperFeatureExtractor,
    Seq2SeqTrainer,
    Seq2SeqTrainingArguments,
)
import evaluate
import numpy as np


def parse_args():
    parser = argparse.ArgumentParser(description="Fine-tune Whisper on Hausa speech data")
    parser.add_argument("--data_dir", type=str, default="./data/hausa",
                        help="Directory containing processed dataset")
    parser.add_argument("--output_dir", type=str, default="./whisper-hausa-finetuned",
                        help="Directory to save fine-tuned model")
    parser.add_argument("--model_name", type=str, default="openai/whisper-small",
                        help="Base Whisper model to fine-tune")
    parser.add_argument("--epochs", type=int, default=10,
                        help="Number of training epochs")
    parser.add_argument("--batch_size", type=int, default=16,
                        help="Training batch size per device")
    parser.add_argument("--gradient_accumulation", type=int, default=2,
                        help="Gradient accumulation steps")
    parser.add_argument("--learning_rate", type=float, default=1e-5,
                        help="Learning rate")
    parser.add_argument("--warmup_steps", type=int, default=500,
                        help="Learning rate warmup steps")
    parser.add_argument("--fp16", action="store_true", default=True,
                        help="Use mixed precision training")
    parser.add_argument("--push_to_hub", action="store_true", default=False,
                        help="Push model to HuggingFace Hub")
    return parser.parse_args()


@dataclass
class DataCollatorSpeechSeq2SeqWithPadding:
    """Custom data collator for Whisper fine-tuning.
    
    Handles padding of input features and labels separately,
    replacing padding tokens with -100 so they're ignored in loss computation.
    """
    processor: Any
    decoder_start_token_id: int

    def __call__(self, features: List[Dict[str, Union[List[int], torch.Tensor]]]) -> Dict[str, torch.Tensor]:
        # Pad input features
        input_features = [{"input_features": feature["input_features"]} for feature in features]
        batch = self.processor.feature_extractor.pad(input_features, return_tensors="pt")

        # Pad labels
        label_features = [{"input_ids": feature["labels"]} for feature in features]
        labels_batch = self.processor.tokenizer.pad(label_features, return_tensors="pt")

        # Replace padding with -100 (ignored in loss)
        labels = labels_batch["input_ids"].masked_fill(
            labels_batch.attention_mask.ne(1), -100
        )

        # Remove BOS token if it was prepended during tokenization
        if (labels[:, 0] == self.decoder_start_token_id).all().cpu().item():
            labels = labels[:, 1:]

        batch["labels"] = labels
        return batch


def compute_metrics(pred, tokenizer, metric):
    """Compute Word Error Rate (WER) for evaluation."""
    pred_ids = pred.predictions
    label_ids = pred.label_ids

    # Replace -100 with pad token id
    label_ids[label_ids == -100] = tokenizer.pad_token_id

    # Decode predictions and references
    pred_str = tokenizer.batch_decode(pred_ids, skip_special_tokens=True)
    label_str = tokenizer.batch_decode(label_ids, skip_special_tokens=True)

    # Compute WER
    wer = 100 * metric.compute(predictions=pred_str, references=label_str)
    return {"wer": wer}


def main():
    args = parse_args()

    print("=" * 60)
    print("  Voice to Value — Whisper Hausa Fine-Tuning")
    print("=" * 60)

    # Detect device
    if torch.cuda.is_available():
        device = "cuda"
        print(f"🖥️  Using GPU: {torch.cuda.get_device_name(0)}")
        print(f"   VRAM: {torch.cuda.get_device_properties(0).total_mem / 1e9:.1f} GB")
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        device = "mps"
        print("🖥️  Using Apple MPS")
    else:
        device = "cpu"
        print("⚠️  Using CPU — training will be very slow!")
        args.fp16 = False  # FP16 not supported on CPU

    print()

    # Load model components
    print(f"📦 Loading base model: {args.model_name}")
    feature_extractor = WhisperFeatureExtractor.from_pretrained(args.model_name)
    tokenizer = WhisperTokenizer.from_pretrained(
        args.model_name, language="ha", task="transcribe"
    )
    processor = WhisperProcessor.from_pretrained(
        args.model_name, language="ha", task="transcribe"
    )
    model = WhisperForConditionalGeneration.from_pretrained(args.model_name)

    # Configure for Hausa
    model.generation_config.language = "ha"
    model.generation_config.task = "transcribe"
    model.generation_config.forced_decoder_ids = None

    print(f"   Parameters: {model.num_parameters() / 1e6:.0f}M")
    print()

    # Load processed dataset
    print(f"📂 Loading dataset from: {args.data_dir}")
    train_dataset = load_from_disk(os.path.join(args.data_dir, "train"))
    test_dataset = load_from_disk(os.path.join(args.data_dir, "test"))
    print(f"   Train: {len(train_dataset)} samples")
    print(f"   Test:  {len(test_dataset)} samples")
    print()

    # Data collator
    data_collator = DataCollatorSpeechSeq2SeqWithPadding(
        processor=processor,
        decoder_start_token_id=model.config.decoder_start_token_id,
    )

    # Evaluation metric
    wer_metric = evaluate.load("wer")

    # Training arguments
    training_args = Seq2SeqTrainingArguments(
        output_dir=args.output_dir,
        per_device_train_batch_size=args.batch_size,
        per_device_eval_batch_size=args.batch_size // 2,
        gradient_accumulation_steps=args.gradient_accumulation,
        learning_rate=args.learning_rate,
        warmup_steps=args.warmup_steps,
        num_train_epochs=args.epochs,
        fp16=args.fp16 and device == "cuda",
        eval_strategy="epoch",
        save_strategy="epoch",
        logging_steps=25,
        load_best_model_at_end=True,
        metric_for_best_model="wer",
        greater_is_better=False,
        predict_with_generate=True,
        generation_max_length=225,
        report_to=["tensorboard"],
        push_to_hub=args.push_to_hub,
        save_total_limit=3,
        remove_unused_columns=False,
        label_names=["labels"],
        dataloader_num_workers=2 if device != "cpu" else 0,
    )

    # Trainer
    trainer = Seq2SeqTrainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=test_dataset,
        data_collator=data_collator,
        compute_metrics=lambda pred: compute_metrics(pred, tokenizer, wer_metric),
        tokenizer=processor.feature_extractor,
    )

    # Train
    print("🚀 Starting fine-tuning...")
    print(f"   Epochs:              {args.epochs}")
    print(f"   Batch size:          {args.batch_size}")
    print(f"   Gradient accum:      {args.gradient_accumulation}")
    print(f"   Effective batch:     {args.batch_size * args.gradient_accumulation}")
    print(f"   Learning rate:       {args.learning_rate}")
    print(f"   FP16:                {args.fp16 and device == 'cuda'}")
    print(f"   Output:              {args.output_dir}")
    print()

    train_result = trainer.train()

    # Save final model
    print("\n💾 Saving fine-tuned model...")
    trainer.save_model(args.output_dir)
    processor.save_pretrained(args.output_dir)
    tokenizer.save_pretrained(args.output_dir)

    # Log metrics
    metrics = train_result.metrics
    trainer.log_metrics("train", metrics)
    trainer.save_metrics("train", metrics)

    # Evaluate
    print("\n📊 Running final evaluation...")
    eval_metrics = trainer.evaluate()
    trainer.log_metrics("eval", eval_metrics)
    trainer.save_metrics("eval", eval_metrics)

    print(f"\n✅ Fine-tuning complete!")
    print(f"   Final WER: {eval_metrics.get('eval_wer', 'N/A'):.2f}%")
    print(f"   Model saved to: {args.output_dir}")
    print(f"\n🚀 Next step: Run 'python inference.py --audio path/to/audio.wav'")


if __name__ == "__main__":
    main()
