from fastapi import APIRouter
from pydantic import BaseModel
from typing import Dict
from src.services.inference_service import forward_chaining_cf

router = APIRouter(prefix="/diagnosis", tags=["Diagnosis"])


class DiagnosisRequest(BaseModel):
    gejala: Dict[str, float]


@router.post("/")
def diagnosis(request: DiagnosisRequest):
    hasil = forward_chaining_cf(request.gejala)

    if not hasil:
        return {
            "message": "Tidak ada rule yang terpenuhi"
        }

    return {
        "diagnosis": [
            {
                "penyakit": p,
                "cf": round(cf, 3),
                "persentase": f"{round(cf * 100, 2)}%"
            }
            for p, cf in sorted(
                hasil.items(),
                key=lambda x: x[1],
                reverse=True
            )
        ]
    }
