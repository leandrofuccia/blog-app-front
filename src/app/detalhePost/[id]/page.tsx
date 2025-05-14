"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { IPostagem } from "@/types/postagem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { MainWrapper, PostContent } from "@/components/Common";
import { useThemeToggle } from "@/context/ThemeContext";

const ReadPostPage = () => {
  const [post, setPost] = useState<IPostagem | null>(null);
  const params = useParams();
  const { toggleTheme } = useThemeToggle();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setErrorMessage(null);
        const token = localStorage.getItem("token");

        const response = await axios.get(`/api/detalhePostagem/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let postData = response.data;

        try {
          const usuarioResponse = await axios.get(
            `/api/usuario/autorPostagem/${postData.usuarioid}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const autorNome = usuarioResponse.data?.nome || "Autor desconhecido";
          setPost({ ...postData, autorNome });
        } catch (error: any) {
          const message = error?.response?.data?.message || "Erro ao buscar autor.";
          setErrorMessage(message);
          alert(message);
          setPost({ ...postData, autorNome: "Erro ao carregar autor" });
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || "Erro ao buscar postagem.";
        setErrorMessage(message);
        alert(message);
      }
    };

    fetchPost();
  }, [params.id]);

  if (!post) {
    return <p>Carregando postagem...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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
          <PostContent>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <small>Autor: {post.autorNome}</small>
            <small>
              Criado em: {new Date(post.datacriacao!).toLocaleDateString()}
            </small>
            <small>
              Atualizado em:{" "}
              {post.dataatualizacao
                ? new Date(post.dataatualizacao).toLocaleDateString()
                : "Nunca atualizado"}
            </small>
          </PostContent>
        </main>
      </MainWrapper>
    </>
  );
};

export default ReadPostPage;
