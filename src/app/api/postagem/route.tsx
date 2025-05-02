import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;

    // Recupera o token de autenticação (pode ser do localStorage ou outro local)
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    // Faz a chamada ao back-end com o token no cabeçalho
    const response = await axios.get("http://localhost:3002/posts", {
      params: { page, limit },
      headers: {
        Authorization: token, // Inclui o token no cabeçalho
      },
    });

    // Retorna as postagens para o front-end
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
    return NextResponse.json({ message: "Erro ao buscar postagens" }, { status: 500 });
  }
}


/*import { NextResponse } from "next/server";
import axios from "axios";

// Função para buscar todas as postagens com paginação
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Verifica se o ID está na URL

    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    if (id && id !== "postagem") {
      // Se houver ID na URL, busca a postagem específica pelo ID
      const response = await axios.get(`http://localhost:3002/posts/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return NextResponse.json(response.data, { status: 200 });
    }

    // Caso contrário, busca todas as postagens com paginação
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;

    const response = await axios.get("http://localhost:3002/posts", {
      params: { page, limit },
      headers: {
        Authorization: token,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
    return NextResponse.json({ message: "Erro ao buscar postagens" }, { status: 500 });
  }
}

*/