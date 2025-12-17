import React from "react";
import "../styles/DiagnosisResultPage.css";

const DiagnosisResult = ({ hasil, perhitungan }) => {
  // hasil: { "Preeklamsia": 0.85, "Anemia": 0.62 }
  // perhitungan: { "Preeklamsia": [{gejala, cf_pakar, cf_sebelum, cf_sesudah, rumus}, ...] }

  // Handle jika hasil kosong
  if (!hasil || Object.keys(hasil).length === 0) {
    return (
      <div className="diagnosis-result">
        <h2>🌸 Hasil Pemeriksaan Ibu</h2>
        <p className="no-result">Tidak ditemukan kemungkinan penyakit berdasarkan gejala yang dipilih.</p>
      </div>
    );
  }

  const sortedResult = Object.entries(hasil)
    .sort((a, b) => b[1] - a[1]);

  const getLevel = (cf) => {
    if (cf >= 0.8) return "Tinggi";
    if (cf >= 0.6) return "Sedang";
    return "Rendah";
  };

  return (
    <div className="diagnosis-result">
      {/* Langkah Perhitungan */}
      <section className="calculation-section">
        <h2>📊 Langkah Perhitungan CF</h2>
        
        {sortedResult.map(([penyakit]) => (
          <div key={penyakit} className="calculation-card">
            <h3>{penyakit}</h3>
            
            <div className="calculation-steps">
              {perhitungan[penyakit]?.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-content">
                    <p className="step-gejala">
                      Gejala: <strong>{step.gejala}</strong> (CF Pakar: {step.cf_pakar})
                    </p>
                    <p className="step-formula">{step.rumus}</p>
                    <p className="step-result">
                      CF Sementara: <strong>{step.cf_sesudah}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="final-cf">
              <span>CF Akhir:</span>
              <strong>{hasil[penyakit]}</strong>
            </div>
          </div>
        ))}
      </section>

      {/* Hasil Akhir */}
      <section className="result-section">
        <h2>🌸 Hasil Pemeriksaan Ibu</h2>

        {sortedResult.map(([penyakit, cf]) => (
          <div key={penyakit} className="result-card">
            <div className="result-header">
              <h3>{penyakit}</h3>
              <span className={`level level-${getLevel(cf).toLowerCase()}`}>
                {getLevel(cf)}
              </span>
            </div>

            <div className="cf-bar-wrapper">
              <div
                className="cf-bar"
                style={{ width: `${cf * 100}%` }}
              />
            </div>

            <p className="cf-text">
              Tingkat keyakinan: <strong>{Math.round(cf * 100)}%</strong>
            </p>

            <p className="note">
              {cf >= 0.8 &&
                "Disarankan segera berkonsultasi dengan tenaga medis."}
              {cf >= 0.6 && cf < 0.8 &&
                "Perlu diperhatikan dan dipantau secara berkala."}
              {cf < 0.6 &&
                "Kemungkinan rendah, namun tetap jaga kondisi tubuh."}
            </p>
          </div>
        ))}

        <p className="disclaimer">
          ⚠️ Hasil ini bersifat informasi awal dan tidak menggantikan
          diagnosis dokter.
        </p>
      </section>
    </div>
  );
};

export default DiagnosisResult;

