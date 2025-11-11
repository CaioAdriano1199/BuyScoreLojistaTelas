const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL || "http://localhost:3000";

export async function bffRequest(path, options = {}) {
  const res = await fetch(`${BFF_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.mensagem || "Erro ao conectar ao servidor");
  }

  return data;
}