"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { IPostagem } from "@/types/postagem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Container, PostContent } from "@/components/Common";
import { useThemeToggle } from "@/context/ThemeContext";

const ReadPostPage = () => {
  
  const [post, setPost] = useState<IPostagem | null>(null);
  const params = useParams();
  const { toggleTheme } = useThemeToggle(); // ← Usa o contexto
  
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
      <>
        <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
        <Container>
          <Header onLogout={handleLogout} />
          <main>
          <PostContent>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <small>Autor: {post.autorNome}</small>
            <small>Criado em: {new Date(post.datacriacao!).toLocaleDateString()}</small>
            <small>
              Atualizado em: {post.dataatualizacao ? new Date(post.dataatualizacao).toLocaleDateString() : "Nunca atualizado"}
            </small>
          </PostContent>
		  </main>	
        </Container>
      </>
    
  );
};

export default ReadPostPage;