export async function POST(req) {
  try {
    const dados = await req.json();

    const resposta = await fetch("http://localhost:3000/comercio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const data = await resposta.json();

    return Response.json(data, { status: resposta.status });
  } catch (error) {
    console.error("Erro na rota do Next:", error);
    return Response.json(
      { mensagem: "Erro interno no Next.js" },
      { status: 500 }
    );
  }
}
