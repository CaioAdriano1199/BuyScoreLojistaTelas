const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL || "http://localhost:3000";

export async function bffRequest(path, options = {}) {
  const res = await fetch(`${BFF_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};
  try {
    data = await res.json();
  } catch (err) {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data?.mensagem || data?.message || "Erro ao conectar ao servidor");
  }

  // Garante que sempre retorna um objeto, nunca undefined ou null
  return data || {};
}