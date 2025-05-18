import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extrai o ID da URL
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    // Envia os dados para o back-end
    const response = await axios.put(
      `http://localhost:3002/posts/${id}`, // ou endpoint correto
      body,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao editar postagem:", error?.response?.data || error.message);
    const message = error?.response?.data?.message || 'Erro ao editar postagem';
    return NextResponse.json({ message }, { status: 500 });

  }
}



