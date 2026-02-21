from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

TASK_PREFIX = "translate English to SQL: "
MODEL_DIR = "./model/t5_spider_ckpt"

device = "cuda" if torch.cuda.is_available() else "cpu"
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_DIR).to(device).eval()

app = FastAPI(title="Text-to-SQL (T5)")

class Input(BaseModel):
    question: str
    max_new_tokens: int = 256
    num_beams: int = 4

@app.post("/translate")
def translate(x: Input):
    text = TASK_PREFIX + x.question
    enc = tokenizer(text, return_tensors="pt", truncation=True, max_length=256).to(device)
    out = model.generate(**enc, max_length=x.max_new_tokens, num_beams=x.num_beams)
    sql = tokenizer.decode(out[0], skip_special_tokens=True)
    return {"sql": sql}
