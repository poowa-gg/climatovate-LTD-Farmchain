"""
Voice to Value — Whisper Hausa Data Preparation
================================================
Downloads and preprocesses the Mozilla Common Voice Hausa dataset
for fine-tuning OpenAI Whisper.

Usage:
    python prepare_data.py [--output_dir ./data/hausa] [--max_samples 5000]
"""

import argparse
import os
from datasets import load_dataset, Audio
from transformers import WhisperFeatureExtractor, WhisperTokenizer


def parse_args():
    parser = argparse.ArgumentParser(description="Prepare Hausa speech data for Whisper fine-tuning")
    parser.add_argument("--output_dir", type=str, default="./data/hausa",
                        help="Directory to save processed dataset")
    parser.add_argument("--max_samples", type=int, default=None,
                        help="Maximum number of samples to use (None = all)")
    parser.add_argument("--model_name", type=str, default="openai/whisper-small",
                        help="Whisper model name for tokenizer/feature extractor")
    parser.add_argument("--sampling_rate", type=int, default=16000,
                        help="Target audio sampling rate")
    return parser.parse_args()


def download_common_voice_hausa(max_samples=None):
    """Download Mozilla Common Voice Hausa dataset."""
    print("📥 Downloading Mozilla Common Voice Hausa dataset...")
    print("   This may take a while on first run (~2-5 GB).\n")

    dataset = load_dataset(
        "mozilla-foundation/common_voice_16_0",
        "ha",
        split="train+validation",
        trust_remote_code=True
    )

    test_dataset = load_dataset(
        "mozilla-foundation/common_voice_16_0",
        "ha",
        split="test",
        trust_remote_code=True
    )

    if max_samples and max_samples < len(dataset):
        dataset = dataset.select(range(max_samples))
        test_size = min(max_samples // 5, len(test_dataset))
        test_dataset = test_dataset.select(range(test_size))

    print(f"✅ Loaded {len(dataset)} training samples and {len(test_dataset)} test samples.\n")
    return dataset, test_dataset


def prepare_features(dataset, feature_extractor, tokenizer, sampling_rate):
    """Process audio and text for Whisper training."""

    # Resample audio to 16kHz
    dataset = dataset.cast_column("audio", Audio(sampling_rate=sampling_rate))

    # Remove unnecessary columns
    columns_to_remove = [
        col for col in dataset.column_names
        if col not in ("audio", "sentence")
    ]
    dataset = dataset.remove_columns(columns_to_remove)

    def preprocess_function(examples):
        # Extract audio features
        audio = examples["audio"]
        inputs = feature_extractor(
            audio["array"],
            sampling_rate=audio["sampling_rate"],
            return_tensors="pt"
        )

        # Tokenize transcription
        labels = tokenizer(examples["sentence"]).input_ids

        return {
            "input_features": inputs.input_features[0],
            "labels": labels
        }

    print("🔄 Processing audio features and tokenizing text...")
    processed = dataset.map(
        preprocess_function,
        remove_columns=dataset.column_names,
        num_proc=1  # Audio processing needs single process
    )

    return processed


def main():
    args = parse_args()

    print("=" * 60)
    print("  Voice to Value — Hausa Speech Data Preparation")
    print("=" * 60)
    print()

    # Initialize tokenizer and feature extractor
    print(f"🔧 Loading Whisper components from: {args.model_name}")
    feature_extractor = WhisperFeatureExtractor.from_pretrained(args.model_name)
    tokenizer = WhisperTokenizer.from_pretrained(
        args.model_name,
        language="ha",
        task="transcribe"
    )

    # Download dataset
    train_dataset, test_dataset = download_common_voice_hausa(args.max_samples)

    # Process training data
    print("\n--- Processing Training Data ---")
    train_processed = prepare_features(
        train_dataset, feature_extractor, tokenizer, args.sampling_rate
    )

    # Process test data
    print("\n--- Processing Test Data ---")
    test_processed = prepare_features(
        test_dataset, feature_extractor, tokenizer, args.sampling_rate
    )

    # Save to disk
    os.makedirs(args.output_dir, exist_ok=True)
    train_path = os.path.join(args.output_dir, "train")
    test_path = os.path.join(args.output_dir, "test")

    print(f"\n💾 Saving processed datasets to: {args.output_dir}")
    train_processed.save_to_disk(train_path)
    test_processed.save_to_disk(test_path)

    print(f"\n✅ Data preparation complete!")
    print(f"   Training samples: {len(train_processed)}")
    print(f"   Test samples:     {len(test_processed)}")
    print(f"   Saved to:         {args.output_dir}")
    print(f"\n🚀 Next step: Run 'python fine_tune.py' to start training.\n")


if __name__ == "__main__":
    main()
