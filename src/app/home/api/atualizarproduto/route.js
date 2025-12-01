import { bffRequest } from "../../../../lib/api";

export async function PUT(req) {
  try {
    const token = req.headers.get("authorization");
    if (!token) {
      return new Response(
        JSON.stringify({ sucesso: false, mensagem: "Token não fornecido" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    const data = await bffRequest("/produto", {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return new Response(
      JSON.stringify({
        sucesso: false,
        mensagem: error.message || "Erro interno do servidor",
      }),
      { status: error.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
