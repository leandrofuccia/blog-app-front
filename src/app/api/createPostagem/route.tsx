import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titulo, conteudo, usuarioid } = body;

    if (!titulo || !conteudo || !usuarioid) {
      return NextResponse.json(
        { message: "Dados incompletos. Título, conteúdo e ID do autor são obrigatórios." },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json(
        { message: "Token não fornecido. Por favor, faça login." },
        { status: 401 }
      );
    }

    const response = await axios.post(
      "http://localhost:3002/posts",
      { titulo, conteudo, usuarioid },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao salvar a postagem';
    console.error('Erro ao salvar a postagem:', message);
    return NextResponse.json({ message }, { status: 400 });

  }
}




