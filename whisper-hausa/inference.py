"""
Voice to Value — Whisper Hausa Inference
========================================
Transcribes Hausa audio using the fine-tuned Whisper model.

Usage:
    python inference.py --audio path/to/hausa_audio.wav
    python inference.py --audio path/to/audio.wav --model ./whisper-hausa-finetuned
"""

import argparse
import time
import torch
import numpy as np

from transformers import WhisperForConditionalGeneration, WhisperProcessor
import librosa


def parse_args():
    parser = argparse.ArgumentParser(description="Transcribe Hausa audio with fine-tuned Whisper")
    parser.add_argument("--audio", type=str, required=True,
                        help="Path to audio file (WAV, MP3, FLAC, etc.)")
    parser.add_argument("--model", type=str, default="./whisper-hausa-finetuned",
                        help="Path to fine-tuned model directory")
    parser.add_argument("--language", type=str, default="ha",
                        help="Language code (default: ha for Hausa)")
    parser.add_argument("--use_base", action="store_true",
                        help="Use base Whisper model instead of fine-tuned (for comparison)")
    return parser.parse_args()


def load_audio(audio_path, target_sr=16000):
    """Load and resample audio file to 16kHz mono."""
    print(f"🎵 Loading audio: {audio_path}")

    audio, sr = librosa.load(audio_path, sr=target_sr, mono=True)
    duration = len(audio) / target_sr

    print(f"   Duration: {duration:.1f}s | Sample rate: {target_sr}Hz | Samples: {len(audio)}")
    return audio, target_sr


def transcribe(audio, sr, model, processor, language="ha"):
    """Transcribe audio using the Whisper model."""
    # Extract features
    input_features = processor.feature_extractor(
        audio, sampling_rate=sr, return_tensors="pt"
    ).input_features

    # Move to device
    device = next(model.parameters()).device
    input_features = input_features.to(device)

    # Generate transcription
    with torch.no_grad():
        predicted_ids = model.generate(
            input_features,
            language=language,
            task="transcribe",
            max_new_tokens=225,
            return_dict_in_generate=True,
            output_scores=True,
        )

    # Decode
    transcription = processor.tokenizer.batch_decode(
        predicted_ids.sequences, skip_special_tokens=True
    )[0].strip()

    # Estimate confidence (average log probability of generated tokens)
    if hasattr(predicted_ids, 'scores') and predicted_ids.scores:
        log_probs = []
        for i, score in enumerate(predicted_ids.scores):
            token_id = predicted_ids.sequences[0, i + 1]
            token_log_prob = torch.nn.functional.log_softmax(score, dim=-1)
            log_probs.append(token_log_prob[0, token_id].item())

        avg_log_prob = np.mean(log_probs) if log_probs else 0
        confidence = np.exp(avg_log_prob) * 100  # Convert to percentage
    else:
        confidence = None

    return transcription, confidence


def main():
    args = parse_args()

    print("=" * 60)
    print("  Voice to Value — Hausa Speech Transcription")
    print("=" * 60)
    print()

    # Determine model path
    model_path = "openai/whisper-small" if args.use_base else args.model
    print(f"📦 Loading model: {model_path}")

    # Detect device
    if torch.cuda.is_available():
        device = "cuda"
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        device = "mps"
    else:
        device = "cpu"
    print(f"🖥️  Device: {device}")

    # Load model and processor
    processor = WhisperProcessor.from_pretrained(model_path)
    model = WhisperForConditionalGeneration.from_pretrained(model_path).to(device)
    model.eval()

    print(f"   Parameters: {model.num_parameters() / 1e6:.0f}M")
    print()

    # Load audio
    audio, sr = load_audio(args.audio)
    print()

    # Transcribe
    print("🔄 Transcribing...")
    start_time = time.time()

    transcription, confidence = transcribe(
        audio, sr, model, processor, language=args.language
    )

    elapsed = time.time() - start_time
    rtf = elapsed / (len(audio) / sr)  # Real-time factor

    # Display results
    print()
    print("=" * 60)
    print("  📝 TRANSCRIPTION RESULT")
    print("=" * 60)
    print()
    print(f"  Text: {transcription}")
    print()
    if confidence is not None:
        print(f"  Confidence: {confidence:.1f}%")
    print(f"  Time:       {elapsed:.2f}s (RTF: {rtf:.2f}x)")
    print(f"  Language:   {args.language}")
    print(f"  Model:      {'base' if args.use_base else 'fine-tuned'}")
    print()
    print("=" * 60)

    # Return for programmatic use
    return {
        "transcription": transcription,
        "confidence": confidence,
        "elapsed_seconds": elapsed,
        "rtf": rtf,
        "language": args.language,
    }


# --- Batch transcription utility ---
def transcribe_batch(audio_paths, model_path="./whisper-hausa-finetuned", language="ha"):
    """Transcribe multiple audio files. Useful for pipeline integration."""
    if torch.cuda.is_available():
        device = "cuda"
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        device = "mps"
    else:
        device = "cpu"

    processor = WhisperProcessor.from_pretrained(model_path)
    model = WhisperForConditionalGeneration.from_pretrained(model_path).to(device)
    model.eval()

    results = []
    for path in audio_paths:
        audio, sr = load_audio(path)
        text, conf = transcribe(audio, sr, model, processor, language)
        results.append({"path": path, "transcription": text, "confidence": conf})
        print(f"  ✅ {path}: {text}")

    return results


if __name__ == "__main__":
    main()
