# Whisper ASR — Hausa Fine-Tuning Pipeline

Fine-tune OpenAI's Whisper model on Hausa speech data from Mozilla Common Voice for the Voice to Value platform.

## Prerequisites

- **Python** 3.9+
- **GPU** with 16GB+ VRAM (NVIDIA A100/V100 recommended) or use Google Colab T4
- **CUDA** 11.8+ and cuDNN installed
- **Disk** ~20GB free for dataset + model checkpoints

## Quick Start

```bash
# 1. Create virtual environment
python -m venv whisper-env
source whisper-env/bin/activate  # Linux/Mac
# whisper-env\Scripts\activate   # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Prepare Hausa dataset
python prepare_data.py

# 4. Fine-tune Whisper on Hausa
python fine_tune.py

# 5. Run inference on a Hausa audio file
python inference.py --audio path/to/hausa_audio.wav
```

## File Overview

| File | Description |
|---|---|
| `requirements.txt` | All Python dependencies |
| `prepare_data.py` | Downloads & preprocesses Mozilla Common Voice Hausa |
| `fine_tune.py` | Fine-tunes Whisper `small` with Seq2SeqTrainer |
| `inference.py` | Transcribes Hausa audio using the fine-tuned model |

## Model Details

| Parameter | Value |
|---|---|
| Base Model | `openai/whisper-small` |
| Language | Hausa (`ha`) |
| Dataset | Mozilla Common Voice 16.0 (Hausa) |
| Training Epochs | 10 |
| Batch Size | 16 (gradient accumulation: 2) |
| Learning Rate | 1e-5 |
| Expected WER | ~25-35% (improves with more data) |

## Training on Google Colab

If you don't have a local GPU, upload these files to Google Colab and select a T4 GPU runtime. The `fine_tune.py` script auto-detects CUDA/CPU/MPS.

## Output

The fine-tuned model is saved to `./whisper-hausa-finetuned/` and can be loaded directly with HuggingFace Transformers for inference or deployment.
