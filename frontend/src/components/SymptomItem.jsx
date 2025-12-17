const SymptomItem = ({ kode, nama, value, onChange }) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label>
        <input
          type="checkbox"
          checked={value > 0}
          onChange={(e) =>
            onChange(kode, e.target.checked ? 0.5 : 0)
          }
        />
        {" "}{nama}
      </label>

      {value > 0 && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={(e) =>
            onChange(kode, parseFloat(e.target.value))
          }
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
};

export default SymptomItem;
