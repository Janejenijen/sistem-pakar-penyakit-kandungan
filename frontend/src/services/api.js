const BASE_URL = "http://localhost:8000/api";

export async function diagnose(gejala) {
  const response = await fetch(`${BASE_URL}/diagnosis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ gejala }),
  });

  if (!response.ok) {
    throw new Error("Gagal melakukan diagnosis");
  }

  return response.json();
}
