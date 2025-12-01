import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const ABACATEPAY_BASE = "https://api.abacatepay.com/v1";
  const ABACATEPAY_KEY = "abc_dev_N0B1Rt5RwDKr2LWzGHfegDwk"; // <<< substitua pela sua chave para DEV

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
    return NextResponse.json(json, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
