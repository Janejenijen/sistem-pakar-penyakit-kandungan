import { useState } from "react";
import SymptomItem from "../components/SymptomItem";
import DiagnosisResult from "../components/DiagnosisResult";
import "../styles/DiagnosisPage.css";
import { diagnose } from "../services/api";

const symptoms = [
  { kode: "G01", nama: "Pusing" },
  { kode: "G02", nama: "Lemas" },
  { kode: "G03", nama: "Sakit kepala hebat" },
  { kode: "G04", nama: "Tekanan darah tinggi" },
  { kode: "G05", nama: "Bengkak wajah/tangan" },
  { kode: "G06", nama: "Perdarahan vagina" },
  { kode: "G07", nama: "Perdarahan tanpa nyeri" },
  { kode: "G08", nama: "Perdarahan disertai nyeri" },
  { kode: "G09", nama: "Nyeri saat BAK" },
  { kode: "G10", nama: "Anyang-anyangan" },
  { kode: "G11", nama: "Urine keruh/berbau" },
  { kode: "G12", nama: "Nyeri perut bawah" },
  { kode: "G13", nama: "Keputihan berbau" },
  { kode: "G14", nama: "Keputihan gatal" },
  { kode: "G15", nama: "Cairan bening keluar" },
  { kode: "G16", nama: "Haus berlebih" },
  { kode: "G17", nama: "Sering buang air kecil" },
];

const DiagnosisPage = () => {
  const [gejala, setGejala] = useState({});
  const [hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (kode, value) => {
    setGejala((prev) => {
      const updated = { ...prev };
      if (value === 0) delete updated[kode];
      else updated[kode] = value;
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (Object.keys(gejala).length === 0) {
      setError("Silakan pilih minimal satu gejala 🙏");
      return;
    }

    setLoading(true);
    setError("");
    setHasil(null);

    try {
      const response = await diagnose(gejala);
      setHasil(response.diagnosis);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat proses diagnosis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diagnosis-container">
      <header className="header">
        <h1>👶 Pemeriksaan Kehamilan</h1>
        <p>Aplikasi pendamping ibu hamil trimester kedua</p>
      </header>

      <section className="intro">
        <p>Halo, Ibu 💕</p>
        <p>Pilih keluhan yang Ibu rasakan hari ini.</p>
      </section>

      <section className="symptoms">
        {symptoms.map((s) => (
          <SymptomItem
            key={s.kode}
            kode={s.kode}
            nama={s.nama}
            value={gejala[s.kode] || 0}
            onChange={handleChange}
          />
        ))}
      </section>

      {error && <p className="error-text">{error}</p>}

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Memproses..." : "💙 Lihat Hasil Pemeriksaan"}
      </button>

      {hasil && <DiagnosisResult hasil={hasil} />}
    </div>
  );
};

export default DiagnosisPage;
