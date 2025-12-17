export const diagnose = async (data) => {
  const response = await fetch("http://localhost:8000/api/diagnosis", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gagal diagnosis");
  }

  return response.json();
};


export const getHistory = async () => {
  const response = await fetch("http://localhost:8000/api/history", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Gagal mendapatkan riwayat");
  }

  return response.json();
};