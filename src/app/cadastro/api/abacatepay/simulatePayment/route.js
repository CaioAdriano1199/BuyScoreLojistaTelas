export async function POST(req) {
  const { pixId } = await req.json();
  const ABACATEPAY_BASE = "https://api.abacatepay.com/v1";
  const ABACATEPAY_KEY = process.env.ABACATEPAY_KEY;

  try {
    const res = await fetch(
      `${ABACATEPAY_BASE}/pixQrCode/simulate-payment?id=${pixId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ABACATEPAY_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    const json = await res.json();
    return Response.json(json);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
