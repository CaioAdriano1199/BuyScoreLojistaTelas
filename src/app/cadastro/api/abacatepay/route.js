import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const dados = await request.json();

    // Aqui você poderia salvar no seu banco (ex: Prisma, Mongo etc.)
    console.log("Cadastro recebido:", dados);

    // Aqui vem a integração com o AbacatePay
    // Você vai precisar da sua chave API:
    const apiKey = process.env.ABACATEPAY_API_KEY;

    const response = await fetch("https://api.abacatepay.com/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        amount: 90, // valor em centavos (R$00,90)
        currency: "BRL",
        description: "Cadastro completo",
        callbackUrl: "https://seusite.com/pagamento/concluido",
      }),
    });

    const result = await response.json();

    // A API do AbacatePay normalmente retorna um link de pagamento
    return NextResponse.json({ paymentUrl: result.checkout_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao processar cadastro" }, { status: 500 });
  }
}
