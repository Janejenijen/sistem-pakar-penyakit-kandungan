from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from src.services.inference_service import forward_chaining_cf
from src.services.data_loader import load_json

router = APIRouter()

class GejalaInput(BaseModel):
    id: str
    cf_user: float

class DiagnosaRequest(BaseModel):
    gejala: List[GejalaInput]

@router.post("/diagnosis")
def diagnosis(data: DiagnosaRequest):
    hasil = forward_chaining_cf(
        [g.dict() for g in data.gejala]
    )

    penyakit_data = load_json("penyakit.json")

    response = []
    for pid, cf in sorted(hasil.items(), key=lambda x: x[1], reverse=True):
        penyakit = next(p for p in penyakit_data if p["id"] == pid)
        response.append({
            "id": pid,
            "nama": penyakit["nama"],
            "cf": round(cf, 3),
            "persentase": f"{cf * 100:.1f}%"
        })

    return {"diagnosis": response}
