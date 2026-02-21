from datasets import load_dataset

ds = load_dataset("xlangai/spider")
print(ds)
print("Train rows:", len(ds["train"]))
split = "validation" if "validation" in ds else "dev"
print("Dev rows:", len(ds[split]))
print("Columns:", ds["train"].column_names)
print("Sample question:", ds["train"][0]["question"])
print("Sample query:", ds["train"][0]["query"])
