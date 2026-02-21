import os
import re
import math
import argparse
import numpy as np
import torch
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    DataCollatorForSeq2Seq,
    Seq2SeqTrainingArguments,
    Seq2SeqTrainer,
    set_seed,
)

TASK_PREFIX = "translate English to SQL: "

def normalize_sql(s: str) -> str:
    s = s.strip().replace("\n", " ")
    s = " ".join(s.split())
    return s.lower()

def get_splits(ds):
    train_ds = ds["train"]
    dev_key = "validation" if "validation" in ds else ("dev" if "dev" in ds else None)
    if dev_key is None:
        raise ValueError(f"No dev/validation split found in {list(ds.keys())}")
    return train_ds, ds[dev_key]

def make_preprocess(tokenizer, max_input_len, max_target_len):
    def fn(batch):
        inputs = [TASK_PREFIX + q for q in batch["question"]]
        targets = batch["query"]
        x = tokenizer(inputs, max_length=max_input_len, truncation=True, padding=False)
        y = tokenizer(text_target=targets, max_length=max_target_len, truncation=True, padding=False)
        x["labels"] = y["input_ids"]
        return x
    return fn

def make_metrics(tokenizer):
    pad = int(tokenizer.pad_token_id)

    def metrics(eval_pred):
        preds, labels = eval_pred
        if isinstance(preds, tuple):
            preds = preds[0]

        preds = np.asarray(preds).astype(np.int64)
        labels = np.asarray(labels).astype(np.int64)

        preds[preds < 0] = pad
        labels[labels < 0] = pad

        pred_text = tokenizer.batch_decode(preds, skip_special_tokens=True)
        gold_text = tokenizer.batch_decode(labels, skip_special_tokens=True)

        em = float(np.mean([normalize_sql(p) == normalize_sql(g) for p, g in zip(pred_text, gold_text)]))
        return {"exact_match": em}

    return metrics

def latest_checkpoint(output_dir: str):
    if not os.path.isdir(output_dir):
        return None
    ckpts = []
    for name in os.listdir(output_dir):
        m = re.match(r"checkpoint-(\d+)$", name)
        if m:
            ckpts.append((int(m.group(1)), os.path.join(output_dir, name)))
    if not ckpts:
        return None
    ckpts.sort(key=lambda x: x[0])
    return ckpts[-1][1]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dataset", default="xlangai/spider")
    ap.add_argument("--model_name", default="t5-base")
    ap.add_argument("--output_dir", default="./model/t5_spider_ckpt")
    ap.add_argument("--seed", type=int, default=42)

    ap.add_argument("--max_input_len", type=int, default=256)
    ap.add_argument("--max_target_len", type=int, default=256)

    ap.add_argument("--epochs", type=int, default=5)
    ap.add_argument("--lr", type=float, default=3e-4)
    ap.add_argument("--train_bs", type=int, default=8)
    ap.add_argument("--eval_bs", type=int, default=8)
    ap.add_argument("--grad_accum", type=int, default=2)

    ap.add_argument("--eval_steps", type=int, default=500)
    ap.add_argument("--save_steps", type=int, default=500)
    ap.add_argument("--logging_steps", type=int, default=50)

    ap.add_argument("--fp16", action="store_true")
    ap.add_argument("--bf16", action="store_true")
    ap.add_argument("--grad_ckpt", action="store_true")
    ap.add_argument("--resume", action="store_true")
    args = ap.parse_args()

    set_seed(args.seed)

    use_cuda = torch.cuda.is_available()
    if args.fp16 and not use_cuda:
        print("fp16 requested but CUDA not available -> disabling fp16")
        args.fp16 = False

    ds = load_dataset(args.dataset)
    train_ds, dev_ds = get_splits(ds)

    tok = AutoTokenizer.from_pretrained(args.model_name, use_fast=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(args.model_name)

    if args.grad_ckpt:
        model.gradient_checkpointing_enable()

    train_tok = train_ds.map(
        make_preprocess(tok, args.max_input_len, args.max_target_len),
        batched=True,
        remove_columns=train_ds.column_names,
        desc="Tokenizing train",
    )
    dev_tok = dev_ds.map(
        make_preprocess(tok, args.max_input_len, args.max_target_len),
        batched=True,
        remove_columns=dev_ds.column_names,
        desc="Tokenizing dev",
    )

    collator = DataCollatorForSeq2Seq(tokenizer=tok, model=model)

    steps_per_epoch = math.ceil(len(train_ds) / (args.train_bs * args.grad_accum))
    total_steps = steps_per_epoch * args.epochs
    warmup_steps = int(total_steps * 0.06)

    targs = Seq2SeqTrainingArguments(
        output_dir=args.output_dir,
        do_train=True,
        do_eval=True,

        eval_strategy="steps",
        eval_steps=args.eval_steps,
        save_strategy="steps",
        save_steps=args.save_steps,
        logging_strategy="steps",
        logging_steps=args.logging_steps,

        per_device_train_batch_size=args.train_bs,
        per_device_eval_batch_size=args.eval_bs,
        gradient_accumulation_steps=args.grad_accum,
        learning_rate=args.lr,
        num_train_epochs=args.epochs,
        weight_decay=0.01,
        warmup_steps=warmup_steps,

        predict_with_generate=True,
        generation_max_length=args.max_target_len,
        generation_num_beams=4,

        fp16=args.fp16,
        bf16=args.bf16,

        dataloader_pin_memory=use_cuda,

        save_total_limit=2,
        load_best_model_at_end=True,
        metric_for_best_model="eval_exact_match",
        greater_is_better=True,

        report_to="none",
    )

    trainer = Seq2SeqTrainer(
        model=model,
        args=targs,
        train_dataset=train_tok,
        eval_dataset=dev_tok,
        processing_class=tok,
        data_collator=collator,
        compute_metrics=make_metrics(tok),
    )

    ckpt = latest_checkpoint(args.output_dir) if args.resume else None
    trainer.train(resume_from_checkpoint=ckpt)
    trainer.save_model(args.output_dir)
    tok.save_pretrained(args.output_dir)

if __name__ == "__main__":
    main()
