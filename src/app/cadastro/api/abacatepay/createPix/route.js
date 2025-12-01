export async function POST(req) {
  const body = await req.json();
  const ABACATEPAY_BASE = "https://api.abacatepay.com/v1";
  const ABACATEPAY_KEY = process.env.ABACATEPAY_KEY;

  try {
    const payload = {
      amount: 10000,
      customer: {
        id: body.customerId,
        name: body.customerName,
        cellphone: body.customerCellphone,
        taxId: body.customerTaxId,
        email: body.customerEmail,
      },
      description: "Cadastro de comércio",
    };

    const res = await fetch(`${ABACATEPAY_BASE}/pixQrCode/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ABACATEPAY_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    return Response.json(json);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
