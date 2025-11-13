import { bffRequest } from "@/lib/api";

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ sucesso: false, mensagem: "ID do produto não fornecido" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const token = req.headers.get("authorization");
    if (!token) {
      return new Response(
        JSON.stringify({ sucesso: false, mensagem: "Token não fornecido" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await bffRequest(`/produto/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    return new Response(
      JSON.stringify({ sucesso: true, ...data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return new Response(
      JSON.stringify({
        sucesso: false,
        mensagem: error.mensagem || "Erro ao tentar excluir produto",
      }),
      { status: error.status || 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
