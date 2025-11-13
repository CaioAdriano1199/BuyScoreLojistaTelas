import { bffRequest } from "../../../lib/api";

export async function POST(req) {
  const body = await req.json();

  try {
    const data = await bffRequest("/login", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ sucesso: false, mensagem: error.message }, { status: 500 });
  }
}