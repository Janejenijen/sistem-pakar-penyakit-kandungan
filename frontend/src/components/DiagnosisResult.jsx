const DiagnosisResult = ({ hasil }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      <h3>Hasil Diagnosis</h3>
      <ul>
        {hasil.map((item, index) => (
          <li key={index}>
            <strong>{item.penyakit}</strong> — {item.persentase}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisResult;
