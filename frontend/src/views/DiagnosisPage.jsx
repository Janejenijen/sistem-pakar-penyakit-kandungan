import React, { useState } from "react";
import "../styles/DiagnosisPage.css";


export default function DiagnosisPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);


  const symptoms = [
    { id: 1, label: "Mual berlebihan" },
    { id: 2, label: "Pusing atau sakit kepala" },
    { id: 3, label: "Nyeri perut bagian bawah" },
    { id: 4, label: "Perdarahan ringan" },
    { id: 5, label: "Kaki bengkak" },
  ];


  const handleChange = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gejala terpilih:", selectedSymptoms);
    // nanti dikirim ke backend FastAPI
  };


  return (
    <div className="diagnosis-container">
      <header className="diagnosis-header">
        <h1>🩺 Diagnosis Kehamilan</h1>
        <p>Pilih gejala yang sedang Ibu rasakan</p>
      </header>


    <form className="diagnosis-form" onSubmit={handleSubmit}>
    {symptoms.map((symptom) => (
      <label key={symptom.id} className="symptom-item">
      <input
        type="checkbox"
        checked={selectedSymptoms.includes(symptom.id)}
        onChange={() => handleChange(symptom.id)}
        />
      <span>{symptom.label}</span>
      </label>
    ))}


      <button type="submit" disabled={selectedSymptoms.length === 0}>
        Proses Diagnosis
      </button>
    </form>
    </div>
  );
}