"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, ErrorText, Input, StyledForm, Textarea } from "@/components/Common";
import Loading from "@/components/Loading";
import { useThemeToggle } from "@/context/ThemeContext"; // ← Importa o hook

const EditPostPage = () => {
  const [autorId, setAutorId] = useState("");
  const [autores, setAutores] = useState([]);
  const [initialValues, setInitialValues] = useState<{ titulo: string; conteudo: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const postId = params.id;
  const { toggleTheme } = useThemeToggle(); // ← Usa o contexto
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Novo estado para mensagens de erro

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("O título é obrigatório").min(3, "O título deve ter pelo menos 3 caracteres").max(255, "O título deve ter no máximo 255 caracteres"),
    conteudo: Yup.string().required("O conteúdo é obrigatório").min(10, "O conteúdo deve ter pelo menos 10 caracteres").max(4000, "O título deve ter no máximo 4000 caracteres"),
  });

  useEffect(() => {
    const fetchPostagem = async () => {
      try {
        setErrorMessage(null); // Limpa mensagem anterior 
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePostagem/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const postagem = response.data;
        setInitialValues({ titulo: postagem.titulo, conteudo: postagem.conteudo });
        setAutorId(postagem.usuarioid);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Erro ao carregar postagem:", error);
        setIsLoading(false);
        const message = error?.response?.data?.message || 'Erro ao carregar postagem.';
        setErrorMessage(message);
        alert(message);
        
      }
    };

    const fetchAutores = async () => {
      try {
        setErrorMessage(null); // Limpa mensagem anterior
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/usuario/autores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAutores(response.data);
      } catch (error: any) {
        console.error("Erro ao carregar autores:", error);
        const message = error?.response?.data?.message || 'Erro ao carregar autores.';
        setErrorMessage(message);
        alert(message);
        
      }
    };

    fetchPostagem();
    fetchAutores();
  }, [postId]);

  const handleSubmit = async (values: { titulo: string; conteudo: string }) => {
    try {
      setErrorMessage(null); // Limpa mensagem anterior  
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
    } catch (error: any) {
      console.error("Erro ao editar postagem:", error);
      const message = error?.response?.data?.message || 'Erro ao editar postagem.';
      setErrorMessage(message);
      alert(message);
      
    }
  };

  if (isLoading || !initialValues) {
    return <Loading />;
  }
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
      <>
        <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
        <Container>
          <Header onLogout={handleLogout} />
          <h2>Editar Postagem</h2>
          <Formik
            key={JSON.stringify(initialValues)} // força re-render ao mudar valores iniciais
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <main>
                <StyledForm onSubmit={handleSubmit}>
                    <Field as={Input} name="titulo" placeholder="Título" maxLength={255}/>
                    <ErrorMessage name="titulo" component={ErrorText} />

                    <Field as={Textarea} name="conteudo" placeholder="Conteúdo" rows={10} maxLength={4000}/>
                    <ErrorMessage name="conteudo" component={ErrorText} />

                    <Button type="submit">Salvar Alterações</Button>
                </StyledForm>
              </main>
            )}
          </Formik>
          
        </Container>
      </>
    
  );
};

export default EditPostPage;

