export async function POST(req) {
  const body = await req.json();

  const ABACATEPAY_BASE = "https://api.abacatepay.com/v1";
  const ABACATEPAY_KEY = process.env.ABACATEPAY_KEY;

  try {
    const payload = {
      name: body.name,
      email: body.email,
      cellphone: body.cellphone,
      taxId: body.taxId,
    };

    const res = await fetch(`${ABACATEPAY_BASE}/customer/create`, {
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
