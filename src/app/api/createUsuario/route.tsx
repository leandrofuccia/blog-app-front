import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, perfilid, credencialId } = body;

    console.log('nome ', nome)
    console.log('perfilid', perfilid)
    console.log('credencialId', credencialId)

    if (!nome || !perfilid || !credencialId) {
      return NextResponse.json(
        { message: "Dados incompletos. Nome, Perfil e Credencial são obrigatórios." },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");

    console.log ('crete usuário token ', token)

    if (!token) {
      return NextResponse.json(
        { message: "Não foi possível criar ou usuário." },
        { status: 401 }
      );
    }

    const response = await axios.post(
      "http://localhost:3002/usuario",
      { nome, perfilid, credencialId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao salvar usuário';
    console.error('Erro ao salvar usuário:', message);
    return NextResponse.json({ message }, { status: 400 });

  }
}




