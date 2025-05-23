'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { ErrorPopup, SuccessPopup } from '@/components/Common';

const Wrapper = styled.div`
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
  width: 320px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledField = styled(Field)<{ disabled?: boolean }>`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${(props) => (props.disabled ? '#eaeaea' : 'white')};
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const StyledSelect = styled(Field)`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const LinkButton = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  color: #0070f3;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
`;

const RegisterPage = () => {
  const router = useRouter();
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Usuário é obrigatório'),
    password: Yup.string().min(4, 'Mínimo de 4 caracteres').required('Senha é obrigatória'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    perfilid: Yup.number().moreThan(0, 'Perfil é obrigatório').required('Perfil é obrigatório'),
  });

  const handleSubmit = async (
    values: {
      nome: string;
      password: string;
      email: string;
      perfilid: number;
    },
    { setSubmitting }: any
  ) => {
    setEmailExists(false);
    setEmailError(null);
    setErrorMessage(null);

    try {
      // 1. Tentar criar credencial
      const credRes = await axios.post('/api/createCredencial', {
        username: values.email,
        password: values.password,
      });

      const credencialId = credRes.data.id;

      // 2. Logar e obter token
      const signinResp = await axios.post('/api/login', {
        username: values.email,
        password: values.password,
      });

      const token = signinResp.data.token;
      localStorage.setItem('token', token);

      // 3. Criar usuário
      await axios.post(
        '/api/createUsuario',
        {
          nome: values.nome,
          perfilid: values.perfilid,
          credencialId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Cadastro realizado com sucesso!');
      setTimeout(() => {
                  setSuccessMessage(null);
                  router.push("/posts");
                }, 2000);      

    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao criar usuário.';

      // Se o erro for de e-mail duplicado (credencial existente)
      if (message.toLowerCase().includes('username') || message.toLowerCase().includes('email')) {
        setEmailExists(true);
        setEmailError('Já existe uma conta com este e-mail. Cadastre outro e-mail.');
      } else {
        setErrorMessage(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <h1>Cadastro</h1>
       {successMessage && (
          <SuccessPopup>
            {successMessage}
              <button onClick={() => setSuccessMessage(null)}>✖</button>
          </SuccessPopup>
        )}
        {errorMessage && (
          <ErrorPopup>
            {errorMessage}
              <button onClick={() => setErrorMessage(null)}>✖</button>
          </ErrorPopup>
        )}
      <Formik
        initialValues={{ nome: '', password: '', email: '', perfilid: 0 }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <StyledForm>
            <StyledField name="nome" type="text" placeholder="Usuário" />
            <StyledErrorMessage><ErrorMessage name="nome" /></StyledErrorMessage>

            <StyledField name="password" type="password" placeholder="Senha" />
            <StyledErrorMessage><ErrorMessage name="password" /></StyledErrorMessage>

            <StyledField
              name="email"
              type="email"
              placeholder="Email"
              //disabled={emailExists}
              onChange={(e: { target: { value: any; }; }) => {
                setFieldValue('email', e.target.value);
                setEmailExists(false); // Resetando estado ao alterar e-mail
                setEmailError(null); 
              }}
            />
            <StyledErrorMessage>
              <ErrorMessage name="email" />
              {emailError && <div>{emailError}</div>}
            </StyledErrorMessage>

            <StyledSelect
              name="perfilid"
              as="select"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFieldValue('perfilid', parseInt(e.target.value, 10))
              }
            >
              <option value={0}>Selecione o perfil</option>
              <option value={1}>Aluno</option>
              <option value={2}>Professor</option>
            </StyledSelect>
            <StyledErrorMessage><ErrorMessage name="perfilid" /></StyledErrorMessage>

            <Button type="submit" disabled={isSubmitting || emailExists}>
              Cadastrar
            </Button>

            <LinkButton type="button" onClick={() => router.push('/login')}>
              Já tem uma conta? Faça login
            </LinkButton>
          </StyledForm>
        )}
      </Formik>
    </Wrapper>
  );
};

export default RegisterPage;
