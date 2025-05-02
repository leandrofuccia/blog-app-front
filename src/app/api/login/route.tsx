import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    // Extrai os dados do corpo da requisição
    const { username, password } = await req.json();

    // Faz chamada ao back-end
    const response = await axios.post('http://localhost:3002/credencial/signin', {
      username,
      password,
    });

    // Retorna o token recebido do back-end
    return NextResponse.json({ token: response.data.token }, { status: 200 });
  } catch (error) {
    console.error('Erro ao processar login:', error);
    return NextResponse.json({ message: 'Erro de autenticação' }, { status: 401 });
  }
}