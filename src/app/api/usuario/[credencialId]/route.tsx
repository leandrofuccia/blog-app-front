import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const credencialId = url.pathname.split("/").pop(); // Extrai o ID da URL

    if (!credencialId) {
      return NextResponse.json({ message: "Credencial ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization"); // Recupera o token do cabeçalho Authorization
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    console.log("Credencial ID recebido:", credencialId);

    // Faz a chamada ao back-end para buscar o perfil do usuário
    const response = await axios.get(`http://localhost:3002/usuario/credencial/${credencialId}`, {
      headers: {
        Authorization: token, // Inclui o token no cabeçalho
      },
    });

    console.log("Dados do usuário:", response.data);

    // Retorna os dados do usuário para o front-end
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    return NextResponse.json({ message: "Erro ao buscar perfil do usuário" }, { status: 500 });
  }
}