from fastapi import APIRouter
from pydantic import BaseModel
import json
from src.services.forward_chaining import forward_chaining_cf

router = APIRouter()

class DiagnosisRequest(BaseModel):
    symptoms: list[str]

@router.post("/diagnosis")
def diagnosis(data: DiagnosisRequest):
    with open("src/dataModel/cf_rules.json", "r", encoding="utf-8") as f:
        rules = json.load(f)

    hasil = forward_chaining_cf(
        data.symptoms,  # parameter 1
        rules           # parameter 2
    )

    return {
        "success": True,
        "data": hasil
    }
