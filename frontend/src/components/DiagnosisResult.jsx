import React from "react";
import "../styles/DiagnosisResultPage.css";

const DiagnosisResult = ({ hasil }) => {
  // hasil contoh:
  // {
  //   "Preeklamsia": 0.85,
  //   "Infeksi Saluran Kemih": 0.62
  // }

  const sortedResult = Object.entries(hasil)
    .sort((a, b) => b[1] - a[1]);

  const getLevel = (cf) => {
    if (cf >= 0.8) return "Tinggi";
    if (cf >= 0.6) return "Sedang";
    return "Rendah";
  };

  return (
    <div className="diagnosis-result">
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
    </div>
  );
};

export default DiagnosisResult;
