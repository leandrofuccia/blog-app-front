/*"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { IPostagem } from "@/types/postagem";
import { Container, PostItemHover, PostList, SearchBar } from "@/components/Common";
import { useThemeToggle } from "@/context/ThemeContext"; // ← Importa o hook

const PostsPage = () => {
  const [posts, setPosts] = useState<IPostagem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPostagem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { toggleTheme } = useThemeToggle(); // ← Usa o contexto
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Novo estado para mensagens de erro

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts.filter(
      (post) =>
        post.titulo.toLowerCase().includes(query) ||
        post.conteudo.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setErrorMessage(null); // Limpa mensagem anterior 
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          params: { page: 1, limit: 10 },
          headers: { Authorization: `Bearer ${token}` },
        });

        const autoresPromises = response.data.map(async (post: IPostagem) => {
          try {
            const usuarioResponse = await axios.get(`/api/usuario/autorPostagem/${post.usuarioid}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return { ...post, autorNome: usuarioResponse.data.nome || "Autor desconhecido" };
          } catch {
            return { ...post, autorNome: "Erro ao carregar autor" };
          }
        });

        const postagensComAutores: IPostagem[] = await Promise.all(autoresPromises);
        setPosts(postagensComAutores);
        setFilteredPosts(postagensComAutores);
      } catch (error: any) {
        console.error("Erro ao buscar postagens:", error);
        const message = error?.response?.data?.message || 'Erro ao buscar postagens.';
        setErrorMessage(message);
        alert(message);
        
      }
    };

    fetchPosts();
  }, []);

  const redirectToPost = (id: number) => {
    router.push(`/detalhePost/${id}`);
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
        ]} open={false} onToggle={function (): void {
          throw new Error("Function not implemented.");
        } }      />

      <Container>
        <Header onLogout={handleLogout} />
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
              {filteredPosts.map((post) => (
                <PostItemHover key={post.id} onClick={() => redirectToPost(post.id!)}>
                  <h3>{post.titulo}</h3>
                  <p>{post.conteudo.length > 50 ? `${post.conteudo.substring(0, 50)}...` : post.conteudo}</p>
                  <small>Autor: {post.autorNome}</small>
                </PostItemHover>
              ))}
            </PostList>
          ) : (
            <p>Nenhuma postagem encontrada.</p>
          )}
        </main>
      </Container>
    </>
  );
};

export default PostsPage;

*/


"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { IPostagem } from "@/types/postagem";
import {
  MainWrapper,
  PostItemHover,
  PostList,
  SearchBar,
} from "@/components/Common";
import { useThemeToggle } from "@/context/ThemeContext";

const PostsPage = () => {
  const [posts, setPosts] = useState<IPostagem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPostagem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { toggleTheme } = useThemeToggle();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = posts.filter(
      (post) =>
        post.titulo.toLowerCase().includes(query) ||
        post.conteudo.toLowerCase().includes(query)
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setErrorMessage(null);
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          params: { page: 1, limit: 10 },
          headers: { Authorization: `Bearer ${token}` },
        });

        const autoresPromises = response.data.map(async (post: IPostagem) => {
          try {
            const usuarioResponse = await axios.get(
              `/api/usuario/autorPostagem/${post.usuarioid}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return {
              ...post,
              autorNome: usuarioResponse.data.nome || "Autor desconhecido",
            };
          } catch {
            return { ...post, autorNome: "Erro ao carregar autor" };
          }
        });

        const postagensComAutores: IPostagem[] = await Promise.all(autoresPromises);
        setPosts(postagensComAutores);
        setFilteredPosts(postagensComAutores);
      } catch (error: any) {
        console.error("Erro ao buscar postagens:", error);
        const message =
          error?.response?.data?.message || "Erro ao buscar postagens.";
        setErrorMessage(message);
        alert(message);
      }
    };

    fetchPosts();
  }, []);

  const redirectToPost = (id: number) => {
    router.push(`/detalhePost/${id}`);
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

      <MainWrapper>
        <Header onLogout={handleLogout} />
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
              {filteredPosts.map((post) => (
                <PostItemHover key={post.id} onClick={() => redirectToPost(post.id!)}>
                  <h3>{post.titulo}</h3>
                  <p>
                    {post.conteudo.length > 50
                      ? `${post.conteudo.substring(0, 50)}...`
                      : post.conteudo}
                  </p>
                  <small>Autor: {post.autorNome}</small>
                </PostItemHover>
              ))}
            </PostList>
          ) : (
            <p>Nenhuma postagem encontrada.</p>
          )}
        </main>
      </MainWrapper>
    </>
  );
};

export default PostsPage;
