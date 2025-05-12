"use client";

import React, { useState, useEffect } from "react";


import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import jwt from "jsonwebtoken";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Container, ErrorText, Input, StyledForm, Textarea, Select } from "@/components/Common";

interface FormValues {
  titulo: string;
  conteudo: string;
  autorId: string;
}

const CreatePostPage = () => {
  const [autores, setAutores] = useState([]);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    titulo: Yup.string()
      .required("O título é obrigatório")
      .min(3, "O título deve ter pelo menos 3 caracteres")
      .max(255, "O título deve ter no máximo 255 caracteres"),
    conteudo: Yup.string()
      .required("O conteúdo é obrigatório")
      .min(10, "O conteúdo deve ter pelo menos 10 caracteres")
      .max(4000, "O título deve ter no máximo 4000 caracteres"),
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
    } catch (error) {
      console.error("Erro ao verificar perfil do usuário:", error);
      alert("Erro ao verificar perfil.");
      router.push("/login");
    }
  };

  const fetchAutores = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/api/usuario/autores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAutores(response.data);
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      alert("Erro ao carregar lista de autores.");
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
  
  return (
      <>
        <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
        <Container>
          <Header onLogout={handleLogout}/>
          <h2>Criar Nova Postagem</h2>
          <Formik<FormValues>
            initialValues={{ titulo: "", conteudo: "", autorId: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const token = localStorage.getItem("token");

                const response = await axios.post(
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

                alert("Postagem criada com sucesso!");
                router.push("/admin");
              } catch (error) {
                console.error("Erro ao criar postagem:", error);
                alert("Erro ao criar postagem. Verifique os dados informados.");
              }
            }}
          >
            {({ handleSubmit }) => (
              <main>	
                <StyledForm onSubmit={handleSubmit}>
                  <Field as={Input} name="titulo" placeholder="Título" maxLength={255}/>
                  <ErrorMessage name="titulo" component={ErrorText} />

                  <Field as={Textarea} name="conteudo" placeholder="Conteúdo" rows={10} maxLength={4000}/>
                  <ErrorMessage name="conteudo" component={ErrorText} />

                  <Field as={Select} name="autorId">
                    <option value="">Selecione o autor</option>
                    {autores
                      .filter((autor: any) => autor.perfilid == 2)
                      .map((autor: any) => (
                        <option key={autor.id} value={autor.id}>
                          {autor.nome}
                        </option>
                      ))}
                  </Field>
                  <ErrorMessage name="autorId" component={ErrorText} />

                  <Button type="submit">Criar Postagem</Button>
                </StyledForm>
             </main> 
            )}
          </Formik>
        </Container>
      </>
   
  );
};

export default CreatePostPage;

