/*"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useThemeToggle } from "@/context/ThemeContext"; // ← Importa o hook
import { Button, Container, PostItemFlex, PostList } from "@/components/Common";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState<number | null>(null); // Armazena o perfil do usuário
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Novo estado para mensagens de erro

  
  const router = useRouter();
	const { toggleTheme } = useThemeToggle(); // ← Usa o contexto
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setErrorMessage(null); // Limpa mensagem anterior 
        const token = localStorage.getItem("token");
        const credencialId = localStorage.getItem("credencialId"); // Assumindo que o credencialId é armazenado após o login
        const response = await axios.get(`/api/usuario/${credencialId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
          if (response.data && response.data.length > 0) {
            const usuario = response.data[0]; // Acessa o primeiro item
            console.log("Usuário encontrado:", usuario);
            setUserProfile(usuario.perfilid);

            if (usuario.perfilid !== 2) {
              alert("Acesso restrito. Apenas professores podem acessar essa página.");
              router.push("/posts"); // Redireciona para a página de posts
            }
          } 
        
      } catch (error: any) {
        console.error("Erro ao verificar perfil do usuário:", error);
        const message = error?.response?.data?.message || 'Erro ao verificar perfil do usuário.';
        setErrorMessage(message);
        alert(message);
        router.push("/login");
      }
    };

    const fetchPosts = async () => {
      try {
        setErrorMessage(null); // Limpa mensagem anterior
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error: any)  {
        const message = error?.response?.data?.message || 'Erro ao buscar postagens.';
        setErrorMessage(message);
        alert(message);
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, [router]);

  const handleDelete = async (postId: number) => {
    try {
      setErrorMessage(null); // Limpa mensagem anterior
      const token = localStorage.getItem("token");
      await axios.delete(`/api/deletePostagem/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post: any) => post.id !== postId));
      alert("Postagem excluída com sucesso!");
    } catch (error: any) {
      console.error("Erro ao excluir postagem:", error);
      const message = error?.response?.data?.message || 'Erro ao excluir postagem.';
      setErrorMessage(message);
      alert(message);
      
    }
  };

  const handleEdit = (postId: number) => {
    router.push(`/admin/editarPost/${postId}`); // Redireciona para a página de edição
  };

  const handleCreate = () => {
    router.push("/admin/criarPost"); // Redireciona para a página de criação
  };
  
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
        <Container>
          <Header onLogout={handleLogout} />
          <h2>Administração de Postagens</h2>
          <Button onClick={handleCreate}>Criar Nova Postagem</Button>
          <main>
          <PostList>
            {posts.map((post: any) => (
              <PostItemFlex key={post.id}>
                <div>
                  <h3>{post.titulo}</h3>
                  <p>{post.conteudo.substring(0, 50)}...</p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => handleEdit(post.id)}>Editar</Button>
                  <Button onClick={() => handleDelete(post.id)}>Excluir</Button>
                </div>
              </PostItemFlex>
            ))}
          </PostList>
         </main>
        </Container> 
      </>
    
  );
};

export default AdminPage;

*/

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Heading2,
  Heading3,
  Paragraph,
  Button,
  PostItemFlex,
  PostList,
  HeaderActions,
  ResponsiveContainer,
  MainWrapper,
  
} from "@/components/Common";
import { useThemeToggle } from "@/context/ThemeContext";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();
  const { toggleTheme } = useThemeToggle();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setErrorMessage(null);
        const token = localStorage.getItem("token");
        const credencialId = localStorage.getItem("credencialId");
        const response = await axios.get(`/api/usuario/${credencialId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length > 0) {
          const usuario = response.data[0];
          console.log("Usuário encontrado:", usuario);
          setUserProfile(usuario.perfilid);

          if (usuario.perfilid !== 2) {
            alert("Acesso restrito. Apenas professores podem acessar essa página.");
            router.push("/posts");
          }
        }

      } catch (error: any) {
        console.error("Erro ao verificar perfil do usuário:", error);
        const message = error?.response?.data?.message || 'Erro ao verificar perfil do usuário.';
        setErrorMessage(message);
        alert(message);
        router.push("/login");
      }
    };

    const fetchPosts = async () => {
      try {
        setErrorMessage(null);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error: any) {
        const message = error?.response?.data?.message || 'Erro ao buscar postagens.';
        setErrorMessage(message);
        alert(message);
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, [router]);

  const handleDelete = async (postId: number) => {
    try {
      setErrorMessage(null);
      const token = localStorage.getItem("token");
      await axios.delete(`/api/deletePostagem/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post: any) => post.id !== postId));
      alert("Postagem excluída com sucesso!");
    } catch (error: any) {
      console.error("Erro ao excluir postagem:", error);
      const message = error?.response?.data?.message || 'Erro ao excluir postagem.';
      setErrorMessage(message);
      alert(message);
    }
  };

  const handleEdit = (postId: number) => {
    router.push(`/admin/editarPost/${postId}`);
  };

  const handleCreate = () => {
    router.push("/admin/criarPost");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  

  return (
    <>
      <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
      <MainWrapper>
        <Header onLogout={handleLogout} />
        <ResponsiveContainer>
          <HeaderActions>
            <Heading2>Administração de Postagens</Heading2>
            <Button onClick={handleCreate}>Criar Nova Postagem</Button>
          </HeaderActions>
        </ResponsiveContainer>
        <main>
          <PostList>
            {posts.map((post: any) => (
              <PostItemFlex key={post.id}>
                <div>
                  <Heading3>{post.titulo}</Heading3>
                  <Paragraph>{post.conteudo.substring(0, 50)}...</Paragraph>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => handleEdit(post.id)}>Editar</Button>
                  <Button onClick={() => handleDelete(post.id)}>Excluir</Button>
                </div>
              </PostItemFlex>
            ))}
          </PostList>
        </main>
      </MainWrapper>
    </>
  );
};

export default AdminPage;
