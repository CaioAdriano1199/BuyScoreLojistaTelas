import { bffRequest } from "@/lib/api";

export async function DELETE(req, { params }) {
  const { id } = params;

  if (!id) {
    return Response.json(
      { sucesso: false, mensagem: "ID do produto não fornecido" },
      { status: 400 }
    );
  }

  try {
    const data = await bffRequest(`/produto/${id}`, {
      method: "DELETE",
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        sucesso: false,
        mensagem: error.mensagem || "Erro ao tentar excluir produto",
      },
      { status: error.status || 500 }
    );
  }
}
