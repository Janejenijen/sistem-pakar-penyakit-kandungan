import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

def load_json(filename: str):
    file_path = BASE_DIR / "dataModel" / filename
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
