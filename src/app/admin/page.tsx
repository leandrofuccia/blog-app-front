"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header"; // Header reutilizável
import Sidebar from "@/components/Sidebar"; // Sidebar reutilizável

// Estilização
const Container = styled.div`
  margin-left: 200px; /* Espaço reservado para a Sidebar */
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
  }
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState<number | null>(null); // Armazena o perfil do usuário
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redireciona para login
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const credencialId = localStorage.getItem("credencialId"); // Assumindo que o credencialId é armazenado após o login
        const response = await axios.get(`/api/usuario/${credencialId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        /*setUserProfile(response.data.perfilid);

        // Redireciona caso o perfil não seja de professor
        console.log('response.data.perfil ', response.data.perfilid)
        if (response.data.perfilid !== 2) {
          alert("Acesso restrito. Apenas professores podem acessar essa página.");
          router.push("/posts"); // Redireciona para a página de posts
        }*/

          if (response.data && response.data.length > 0) {
            const usuario = response.data[0]; // Acessa o primeiro item
            console.log("Usuário encontrado:", usuario);
            setUserProfile(usuario.perfilid);

            if (usuario.perfilid !== 2) {
              alert("Acesso restrito. Apenas professores podem acessar essa página.");
              router.push("/posts"); // Redireciona para a página de posts
            }
          } else {
            alert("Usuário não encontrado.");
            router.push("/login");
          }
        
      } catch (error) {
        console.error("Erro ao verificar perfil do usuário:", error);
        alert("Erro ao verificar perfil. Faça login novamente.");
        router.push("/login");
      }
    };

    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
        alert("Erro ao carregar postagens.");
      }
    };

    fetchUserProfile();
    fetchPosts();
  }, [router]);

  const handleDelete = async (postId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/postagem/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post: any) => post.id !== postId));
      alert("Postagem excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir postagem:", error);
      alert("Erro ao excluir postagem.");
    }
  };

  const handleEdit = (postId: number) => {
    router.push(`/admin/editarPost/${postId}`); // Redireciona para a página de edição
  };

  const handleCreate = () => {
    router.push("/admin/criarPost"); // Redireciona para a página de criação
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        {/* Sidebar com os links de navegação */}
        <Sidebar
          links={[
            { label: "Posts", href: "/posts" },
            { label: "Administração", href: "/admin" },
          ]}
        />
        
        {/* Container principal */}
        <Container>
          <Header onLogout={handleLogout} onToggleTheme={toggleTheme} />
          <h2>Administração de Postagens</h2>
          <Button onClick={handleCreate}>Criar Nova Postagem</Button>
          <PostList>
            {posts.map((post: any) => (
              <PostItem key={post.id}>
                <div>
                  <h3>{post.titulo}</h3>
                  <p>{post.conteudo.substring(0, 50)}...</p>
                </div>
                <div>
                  <Button onClick={() => handleEdit(post.id)}>Editar</Button>
                  <Button onClick={() => handleDelete(post.id)}>Excluir</Button>
                </div>
              </PostItem>
            ))}
          </PostList>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default AdminPage;