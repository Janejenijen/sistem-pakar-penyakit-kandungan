from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict, Optional

from src.services.inference_service import forward_chaining_cf

router = APIRouter()

class DiagnosisRequest(BaseModel):
    gejala: Dict[str, float]
    threshold: Optional[float] = 0.4

@router.post("/diagnosis")
def diagnosis(data: DiagnosisRequest):
    hasil = forward_chaining_cf(
        data.gejala,
        data.threshold
    )

    return {
        "diagnosis": hasil
    }
