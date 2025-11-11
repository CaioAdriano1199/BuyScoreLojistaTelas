import { bffRequest } from "@/lib/api";

export async function POST(req) {
  const body = await req.json();

  const token = req.headers.get("authorization");

  try {
    const data = await bffRequest("/produto", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 500 }
    );
  }
}