import React from "react";
import ".../styles/DiagnosisResultPage.css";

export default function DiagnosisResultPage() {
  // Contoh data dari backend FastAPI
  const result = {
    diagnosis: "Preeklampsia",
    cf: 0.8,
    level: "Pasti",
    description:
      "Preeklampsia adalah kondisi tekanan darah tinggi pada kehamilan yang perlu pemantauan medis.",
    recommendations: [
      "Segera konsultasi ke dokter kandungan",
      "Istirahat yang cukup",
      "Pantau tekanan darah secara rutin",
      "Kurangi aktivitas berat",
    ],
  };


  return (
    <div className="result-container">
      <header className="result-header">
        <h1>📊 Hasil Diagnosis</h1>
        <p>Berikut hasil analisis berdasarkan gejala yang Ibu pilih</p>
      </header>

      <section className="result-card">
        <h2>{result.diagnosis}</h2>
        <p className="confidence">
          Tingkat Keyakinan: <strong>{result.level}</strong> ({result.cf})
        </p>
        <p className="description">{result.description}</p>
      </section>

      <section className="recommendation-card">
        <h3>📝 Rekomendasi</h3>
        <ul>
          {result.recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="action-buttons">
        <button className="primary">Konsultasi Ulang</button>
        <button className="secondary">Kembali ke Beranda</button>
      </div>

      <p className="disclaimer">
        *Hasil diagnosis ini bersifat pendukung dan tidak menggantikan pemeriksaan langsung oleh tenaga medis.
      </p>
    </div>
  );
}