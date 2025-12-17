import React from "react";
import "../styles/SymptomItem.css";

const SymptomItem = ({ kode, nama, value, onChange }) => {
  const isChecked = value > 0;

  const handleCheckbox = (e) => {
    if (!e.target.checked) {
      onChange(kode, 0);
    } else {
      onChange(kode, 0.6); // default CF user
    }
  };

  const handleSlider = (e) => {
    onChange(kode, parseFloat(e.target.value));
  };

  return (
    <div className="symptom-card">
      <div className="symptom-header">
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
          <span className="symptom-name">{nama}</span>
        </label>
      </div>

      {isChecked && (
        <div className="symptom-slider">
          <p>
            Seberapa terasa?
            <strong> {Math.round(value * 100)}%</strong>
          </p>

          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={value}
            onChange={handleSlider}
          />

          <div className="slider-labels">
            <span>Ringan</span>
            <span>Sedang</span>
            <span>Berat</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomItem;
