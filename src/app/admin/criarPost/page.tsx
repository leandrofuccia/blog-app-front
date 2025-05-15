"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import jwt from "jsonwebtoken";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  ErrorText,
  Input,
  StyledForm,
  Textarea,
  Select,
  MainWrapper,
  SuccessPopup,
  ErrorPopup,
} from "@/components/Common";
import Loading from "@/components/Loading";

interface FormValues {
  titulo: string;
  conteudo: string;
  autorId: string;
}

const CreatePostPage = () => {
  const [autores, setAutores] = useState([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    titulo: Yup.string()
      .required("O título é obrigatório")
      .min(3, "O título deve ter pelo menos 3 caracteres")
      .max(255, "O título deve ter no máximo 255 caracteres"),
    conteudo: Yup.string()
      .required("O conteúdo é obrigatório")
      .min(10, "O conteúdo deve ter pelo menos 10 caracteres")
      .max(4000, "O conteúdo deve ter no máximo 4000 caracteres"),
    autorId: Yup.string().required("Selecione um autor."),
  });

  const verifyProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token não encontrado. Por favor, faça login novamente.");
        router.push("/login");
        return;
      }
      setErrorMessage(null);
      const decoded = jwt.decode(token) as any;
      const credencialId = decoded.credencialId;

      const response = await axios.get(`/api/usuario/${credencialId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usuario = response.data[0];
      if (usuario.perfilid !== 2) {
        alert("Acesso restrito. Apenas professores podem acessar essa página.");
        router.push("/posts");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erro ao verificar perfil do usuário.";
      setErrorMessage(message);      
      router.push("/login");
    }
  };

  const fetchAutores = async () => {
    try {
      setErrorMessage(null);
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/usuario/autores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAutores(response.data);
      setIsLoading(false);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erro ao buscar autores.";
      setErrorMessage(message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyProfile();
    fetchAutores();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (isLoading || !autores) {
    return <Loading />;
  }

  return (
    <>
      <Sidebar
        links={[
          { label: "Posts", href: "/posts" },
          { label: "Administração", href: "/admin" },
        ]}
      />
      <MainWrapper>
        <Header onLogout={handleLogout} />
        <main>
          <h2>Criar Nova Postagem</h2>
          {successMessage && <SuccessPopup>{successMessage}</SuccessPopup>}
          {errorMessage && <ErrorPopup>{errorMessage}</ErrorPopup>}

          <Formik<FormValues>
            initialValues={{ titulo: "", conteudo: "", autorId: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const token = localStorage.getItem("token");

                await axios.post(
                  "/api/createPostagem",
                  {
                    titulo: values.titulo,
                    conteudo: values.conteudo,
                    usuarioid: values.autorId,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                setSuccessMessage("Postagem criada com sucesso!");
                resetForm();

                // Aguarda 2 segundos antes de redirecionar
                setTimeout(() => {
                  setSuccessMessage(null);
                  router.push("/admin");
                }, 2000);
              } catch (error) {
                console.error("Erro ao criar postagem:", error);
                alert("Erro ao criar postagem. Verifique os dados informados.");
              }
            }}
          >
            {({ handleSubmit, resetForm }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Field as={Input} name="titulo" placeholder="Título" maxLength={255} />
                <ErrorMessage name="titulo" component={ErrorText} />

                <Field
                  as={Textarea}
                  name="conteudo"
                  placeholder="Conteúdo"
                  rows={10}
                  maxLength={4000}
                />
                <ErrorMessage name="conteudo" component={ErrorText} />

                <Field as={Select} name="autorId">
                  <option value="">Selecione o autor</option>
                  {autores
                    .filter((autor: any) => autor.perfilid === 2)
                    .map((autor: any) => (
                      <option key={autor.id} value={autor.id}>
                        {autor.nome}
                      </option>
                    ))}
                </Field>
                <ErrorMessage name="autorId" component={ErrorText} />

                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <Button type="submit">Criar Postagem</Button>
                  <Button type="button" onClick={() => resetForm()} style={{ background: "#ccc" }}>
                    Limpar
                  </Button>
                  <Button type="button" onClick={() => router.push("/admin")} style={{ background: "#888" }}>
                    Voltar
                  </Button>
                </div>
              </StyledForm>
            )}
          </Formik>
        </main>
      </MainWrapper>
    </>
  );
};

export default CreatePostPage;
