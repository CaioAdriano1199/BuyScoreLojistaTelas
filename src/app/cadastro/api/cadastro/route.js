import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const dados = await req.json();
    console.log("🔔 /cadastro route recebeu payload:", JSON.stringify(dados, null, 2));

    const resposta = await fetch("http://localhost:3000/comercio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const data = await resposta.json().catch(() => ({}));
    console.log("🔔 Resposta do BFF (http://localhost:3000/comercio): status=", resposta.status, "body=", JSON.stringify(data, null, 2));

    return NextResponse.json(data || {}, { status: resposta.status });
  } catch (error) {
    console.error("Erro na rota do Next:", error);
    return NextResponse.json(
      { mensagem: "Erro interno no Next.js" },
      { status: 500 }
    );
  }
}
