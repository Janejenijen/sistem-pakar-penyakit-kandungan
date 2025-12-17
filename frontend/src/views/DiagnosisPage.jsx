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
  { kode: "G06", nama: "Nyeri saat BAK" },
  { kode: "G07", nama: "Anyang-anyangan" },
  { kode: "G08", nama: "Urine keruh/berbau" },
  { kode: "G09", nama: "Nyeri perut bawah" },
  { kode: "G13", nama: "Keputihan berbau" },
  { kode: "G14", nama: "Gatal pada vagina" },
];

const DiagnosisPage = () => {
  const [gejala, setGejala] = useState({});
  const [hasil, setHasil] = useState(null);
  const [perhitungan, setPerhitungan] = useState(null);
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
    setPerhitungan(null);

    try {
      const payload = {
        symptoms: Object.keys(gejala)
      };

      const response = await diagnose(payload);
      setHasil(response.data.hasil);
      setPerhitungan(response.data.perhitungan);

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

      {hasil && <DiagnosisResult hasil={hasil} perhitungan={perhitungan} />}
    </div>
  );
};

export default DiagnosisPage;
