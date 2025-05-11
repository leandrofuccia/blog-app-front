import { NextResponse } from "next/server";
import axios from "axios";
import { console } from "inspector";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extrai o ID da URL
    console.log('entrou aqui route.tsx exclusão id ' , id)
    
    if (!id) {
      return NextResponse.json({ message: "ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    // Faz a chamada ao back-end para buscar a postagem
    const response = await axios.delete(`http://localhost:3002/posts/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    // Retorna os dados da postagem para o front-end
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro ao excluir postagem:", error);
    return NextResponse.json({ message: "Erro ao excluir postagem" }, { status: 500 });
  }
}