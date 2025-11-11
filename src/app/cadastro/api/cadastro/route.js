import { bffRequest } from "../../../lib/api";

export async function POST(req) {
  const body = await req.json();

  try {
    const data = await bffRequest("/cadastro", {
      method: "POST",
      body: JSON.stringify(body),
    });

    // Retorna o mesmo JSON do BFF pro front
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ sucesso: false, mensagem: error.message }, { status: 500 });
  }
}