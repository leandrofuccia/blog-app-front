import { NextResponse } from "next/server";
import axios from "axios";
import { console } from "inspector";

export async function DELETE(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/posts/';
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    console.log('entrou aqui route.tsx exclusão id ' , id)
    
    if (!id) {
      return NextResponse.json({ message: "ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    const response = await axios.delete(apiUrl + `${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao excluir postagem:", error);
    const message = error?.response?.data?.message || 'Erro ao excluir postagem';
    return NextResponse.json({ message }, { status: 500 });
  }
}



    
    