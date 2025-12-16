from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers import diagnosis

app = FastAPI(
    title="Sistem Pakar Diagnosis Kehamilan Trimester 2",
    description="Backend sistem pakar menggunakan metode Forward Chaining dan Certainty Factor",
    version="1.0.0"
)

# CORS (agar bisa diakses dari React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # saat production sebaiknya dibatasi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register router
app.include_router(
    diagnosis.router,
    prefix="/api",
    tags=["Diagnosis"]
)

# Endpoint root (opsional, tapi berguna untuk testing)
@app.get("/")
def root():
    return {
        "message": "API Sistem Pakar berjalan dengan baik 🚀"
    }
