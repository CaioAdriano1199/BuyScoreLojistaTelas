import { bffRequest } from "../../../../lib/api";

export async function POST(req) {
  try {
    const token = req.headers.get("authorization");
    if (!token) {
      return new Response(
        JSON.stringify({ sucesso: false, mensagem: "Token não fornecido" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    const produtoCriado = await bffRequest("/produto", {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return new Response(
      JSON.stringify({
        sucesso: true,
        produto: produtoCriado,
        mensagem: "Produto criado com sucesso",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return new Response(
      JSON.stringify({
        sucesso: false,
        mensagem: error.message || "Erro interno do servidor",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
