// src/app/home/api/meusprodutos/route.js
import { bffRequest } from "../../../../lib/api";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization");

    if (!token) {
      return new Response(
        JSON.stringify({ sucesso: false, produtos: [], mensagem: "Token não fornecido" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Chamada para o BFF
    const dados = await bffRequest("/produto/meuprod", {
      method: "GET",
      headers: { Authorization: token }, // já vem como "Bearer <token>"
    });

    return new Response(
      JSON.stringify({ sucesso: true, produtos: dados.produtos || [] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro na rota /meusprodutos:", error);

    return new Response(
      JSON.stringify({ sucesso: false, produtos: [], mensagem: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
