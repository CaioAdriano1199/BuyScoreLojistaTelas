import { bffRequest } from "@/lib/api";

export async function PUT(req) {
  const body = await req.json();

  try {
    const data = await bffRequest("/produto", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { sucesso: false, mensagem: error.message },
      { status: 500 }
    );
  }
}