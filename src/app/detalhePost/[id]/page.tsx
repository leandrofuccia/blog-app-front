"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useParams } from "next/navigation";
import { IPostagem } from "@/types/postagem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Container, PostContent } from "@/components/Common";


const ReadPostPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [post, setPost] = useState<IPostagem | null>(null);
  const params = useParams();

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");

        // Buscar os dados da postagem
        const response = await axios.get(`/api/detalhePostagem/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let postData = response.data;
        console.log("Postagem carregada:", postData);

        // Buscar nome do autor usando usuarioid
        try {
          console.log("Buscando autor para usuarioID:", postData.usuarioid);
          const usuarioResponse = await axios.get(`/api/usuario/autorPostagem/${postData.usuarioid}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const autorNome = usuarioResponse.data?.nome || "Autor desconhecido";
          console.log("Autor Nome definido:", autorNome);

          // Atualizando o estado da postagem com o nome do autor
          setPost({ ...postData, autorNome });
        } catch (error) {
          console.error("Erro ao buscar autor para postagem:", error);
          setPost({ ...postData, autorNome: "Erro ao carregar autor" });
        }
      } catch (error) {
        console.error("Erro ao buscar postagem:", error);
        alert("Erro ao carregar a postagem. Verifique sua autenticação.");
      }
    };

    fetchPost();
  }, [params.id]);

  if (!post) {
    return <p>Carregando postagem...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
        <Container>
          <Header onLogout={handleLogout} onToggleTheme={toggleTheme} />
          <PostContent>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <small>Autor: {post.autorNome}</small>
            <small>Criado em: {new Date(post.datacriacao!).toLocaleDateString()}</small>
            <small>
              Atualizado em: {post.dataatualizacao ? new Date(post.dataatualizacao).toLocaleDateString() : "Nunca atualizado"}
            </small>
          </PostContent>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default ReadPostPage;