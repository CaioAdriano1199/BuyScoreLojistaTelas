import { NextResponse } from "next/server";

/**
 * OPTIONS - para permitir preflight CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS",
      "Access-Control-Allow-Headers": "Authorization,Content-Type",
    },
  });
}

/**
 * GET - chama o BFF e retorna os dados
 */
export async function GET(req) {
  try {
    // Pega o token do header
    const token = req.headers.get("Authorization");

    if (!token) {
      return NextResponse.json(
        { sucesso: false, mensagem: "Token não fornecido" },
        { status: 401 }
      );
    }

    // Chama o BFF
    const response = await fetch("http://localhost:3000/ponto/estatisticas/compras", {
      method: "GET",
      headers: {
        Authorization: token, // já deve vir no formato Bearer
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { sucesso: false, mensagem: errorData.mensagem || "Erro no BFF" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ sucesso: true, compras: data });

  } catch (error) {
    console.error("Erro na rota /home/api/statclientecomp:", error);
    return NextResponse.json(
      { sucesso: false, mensagem: "Erro na comunicação com o BFF" },
      { status: 500 }
    );
  }
}
