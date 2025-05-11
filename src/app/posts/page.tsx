"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header"; // Importando o Header
import Sidebar from "@/components/Sidebar"; // Importando o Sidebar
import { IPostagem } from "@/types/postagem";
import { BasePostItem, Container, PostItemHover, PostList, SearchBar } from "@/components/Common";


const PostsPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [posts, setPosts] = useState<IPostagem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPostagem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Hook para navegação

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redireciona para login
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts.filter(
      (post: any) =>
        post.titulo.toLowerCase().includes(query) ||
        post.conteudo.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {      
      try {
        const token = localStorage.getItem("token");
        
        const response = await axios.get("/api/postagem", {
          params: { page: 1, limit: 10 },
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!response.data || response.data.length === 0) {
          console.error("Nenhuma postagem encontrada na API.");
          alert("Nenhuma postagem encontrada.");
          return;
        }
        
        // Buscar nomes dos autores
        const autoresPromises = response.data.map(async (post: IPostagem): Promise<IPostagem> => {
          try {
            
            const usuarioResponse = await axios.get(`/api/usuario/autorPostagem/${post.usuarioid}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            return { ...post, autorNome: usuarioResponse.data.nome || "Autor desconhecido" };
          } catch (error) {
            console.error("Erro ao buscar autor para postagem:", post, error);
            return { ...post, autorNome: "Erro ao carregar autor" };
          }
        });

        const postagensComAutores: IPostagem[] = await Promise.all(autoresPromises);     

        if (!postagensComAutores || postagensComAutores.length === 0) {
          console.error("Nenhuma postagem encontrada após processamento.");
        } else {
          setPosts(postagensComAutores);
          setFilteredPosts(postagensComAutores);
        }
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);

        if (axios.isAxiosError(error)) {
          console.error("Detalhes do erro:", error.response?.data || "Sem resposta do servidor.");
        } else {
          console.error("Erro inesperado:", error);
        }

        alert("Erro ao carregar postagens. Verifique o console para mais detalhes.");
      }
    };
    
    fetchPosts();
  }, []);

  const redirectToPost = (id: number) => {
    router.push(`/detalhePost/${id}`); // Redireciona para a página de leitura da postagem
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Sidebar
          links={[
            { label: "Posts", href: "/posts" },
            { label: "Administração", href: "/admin" },
          ]}
        />

        <Container>
          <Header onLogout={handleLogout} onToggleTheme={toggleTheme} />
          <SearchBar
            type="text"
            placeholder="Buscar posts por título ou conteúdo..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <main>
            <h2>Lista de Postagens</h2>
            {filteredPosts.length > 0 ? (
              <PostList>
                {filteredPosts.map((post: any) => (
                  <PostItemHover key={post.id} onClick={() => redirectToPost(post.id)}>
                    <h3>{post.titulo}</h3>
                    <p>{post.conteudo.length > 50 ? `${post.conteudo.substring(0, 50)}...` : post.conteudo}</p>
                    <small>Autor: {post.autorNome}</small>
                  </PostItemHover  >
                ))}
              </PostList>
            ) : (
              <p></p>
            )}
          </main>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default PostsPage;