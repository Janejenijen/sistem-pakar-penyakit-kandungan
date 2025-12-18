from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import diagnosis

app = FastAPI(
    title="Sistem Pakar Diagnosis Kehamilan Trimester 2",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(diagnosis.router, prefix="/api")

@app.get("/")
def root():
    return {"message": "API Sistem Pakar siap digunakan"}
