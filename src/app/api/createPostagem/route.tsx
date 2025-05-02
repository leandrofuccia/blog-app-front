import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

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
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error("Erro ao criar postagem:", axiosError.response.data);

      if (axiosError.response.status === 400) {
        return NextResponse.json(
          { message: "Dados inválidos. Verifique as informações fornecidas." },
          { status: 400 }
        );
      }

      if (axiosError.response.status === 403) {
        return NextResponse.json(
          { message: "Acesso restrito. Apenas professores podem criar postagens." },
          { status: 403 }
        );
      }
    } else {
      console.error("Erro desconhecido:", axiosError.message);
    }

    return NextResponse.json(
      { message: "Erro ao criar postagem. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}