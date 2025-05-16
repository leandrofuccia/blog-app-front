'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import jwt from "jsonwebtoken";
import { useState } from 'react';

// Estilização com styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledField = styled(Field)`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

const RegisterLink = styled.p`
  margin-top: 12px;
  font-size: 14px;
  text-align: center;

  a {
    color: #0070f3;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #005bb5;
    }
  }
`;


const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Novo estado para mensagens de erro

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Nome de usuário é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const decodeToken = (token: string) => {
    try {
      const decoded = jwt.decode(token);
      const credencialId = (decoded as any).credencialId;
      return credencialId;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };

  const handleSubmit = async (values: { username: string; password: string }) => {
    setErrorMessage(null); // Limpa mensagem anterior ao tentar novo login

    try {
      const response = await axios.post(
        '/api/login',
        { username: values.username, password: values.password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      localStorage.setItem('token', response.data.token);
      const credencialId = decodeToken(response.data.token);
      localStorage.setItem('credencialId', credencialId);

      router.push('/posts');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao autenticar.';
      setErrorMessage(message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <StyledForm>
            <StyledField name="username" type="text" placeholder="Nome de usuário" />
            <StyledErrorMessage><ErrorMessage name="username" /></StyledErrorMessage>

            <StyledField name="password" type="password" placeholder="Senha" />
            <StyledErrorMessage><ErrorMessage name="password" /></StyledErrorMessage>

            {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>} {/* Exibe o erro do backend */}

            <Button type="submit">Entrar</Button>

            <RegisterLink>
                Não tem uma conta? <a onClick={() => router.push('/registrar')}>Criar conta</a>
            </RegisterLink>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};

export default LoginPage;
