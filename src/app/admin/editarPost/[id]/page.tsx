"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, ErrorText, Input, StyledForm, Textarea } from "@/components/Common";



const EditPostPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [autorId, setAutorId] = useState("");
  const [autores, setAutores] = useState([]);
  const [initialValues, setInitialValues] = useState<{ titulo: string; conteudo: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const postId = params.id;

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("O título é obrigatório").min(3, "O título deve ter pelo menos 3 caracteres").max(255, "O título deve ter no máximo 255 caracteres"),
    conteudo: Yup.string().required("O conteúdo é obrigatório").min(10, "O conteúdo deve ter pelo menos 10 caracteres").max(4000, "O título deve ter no máximo 4000 caracteres"),
  });

  useEffect(() => {
    const fetchPostagem = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePostagem/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const postagem = response.data;
        setInitialValues({ titulo: postagem.titulo, conteudo: postagem.conteudo });
        setAutorId(postagem.usuarioid);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar postagem:", error);
        setIsLoading(false);
        alert("Erro ao carregar postagem.");
      }
    };

    const fetchAutores = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/usuario/autores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAutores(response.data);
      } catch (error) {
        console.error("Erro ao carregar autores:", error);
        alert("Erro ao carregar lista de autores.");
      }
    };

    fetchPostagem();
    fetchAutores();
  }, [postId]);

  const handleSubmit = async (values: { titulo: string; conteudo: string }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/updatePostagem/${postId}`,
        { ...values, usuarioid: autorId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Postagem editada com sucesso!");
      router.push("/admin");
    } catch (error) {
      console.error("Erro ao editar postagem:", error);
      alert("Erro ao editar postagem.");
    }
  };

  if (isLoading || !initialValues) {
    return <p>Carregando postagem...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
        <Container>
          <Header
            onLogout={() => localStorage.removeItem("token")}
            onToggleTheme={() => setTheme(theme === lightTheme ? darkTheme : lightTheme)}
          />
          <h2>Editar Postagem</h2>
          <Formik
            key={JSON.stringify(initialValues)} // força re-render ao mudar valores iniciais
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <StyledForm onSubmit={handleSubmit}>
                <Field as={Input} name="titulo" placeholder="Título" maxLength={255}/>
                <ErrorMessage name="titulo" component={ErrorText} />

                <Field as={Textarea} name="conteudo" placeholder="Conteúdo" rows={10} maxLength={4000}/>
                <ErrorMessage name="conteudo" component={ErrorText} />

                <Button type="submit">Salvar Alterações</Button>
              </StyledForm>
            )}
          </Formik>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default EditPostPage;

