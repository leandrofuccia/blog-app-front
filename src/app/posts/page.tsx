/*'use client'



import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";

// Estilização
const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.color};
`;

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.color};
  padding: 5px 10px;
  cursor: pointer;
`;

const ThemeToggleButton = styled.button`
  margin-left: 10px;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const MenuLinks = styled.nav<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  background-color: ${(props) => props.theme.background};
  padding: 10px;
`;

const Link = styled.a`
  display: block;
  margin: 5px 0;
  text-decoration: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
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
`;

const PostsPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redireciona para login
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
            params: { page: 1, limit: 10 },
            headers: {
              Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
            },
          });
    
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
        alert("Erro ao carregar postagens.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <h1>Posts</h1>
          <div>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <ThemeToggleButton onClick={toggleTheme}>Alterar Tema</ThemeToggleButton>
          </div>
        </Header>
        <HamburgerMenu onClick={toggleMenu}>
          <span>☰ Menu</span>
        </HamburgerMenu>
        <MenuLinks open={menuOpen}>
          <Link href="/posts">Posts</Link>
          <Link href="/admin">Administração</Link>
        </MenuLinks>
        <main>
          <h2>Lista de Postagens</h2>
          <PostList>
            {posts.map((post: any, index: number) => (
              <PostItem key={index}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <small>Autor: {post.author}</small>
              </PostItem>
            ))}
          </PostList>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default PostsPage;

*/

/*"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useRouter } from "next/navigation"; // Importação do useRouter para navegação dinâmica

// Estilização
const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.color};
`;

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.color};
  padding: 5px 10px;
  cursor: pointer;
`;

const ThemeToggleButton = styled.button`
  margin-left: 10px;
  background-color: ${(props) => props.theme.color};
  color: ${(props) => props.theme.background};
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const MenuLinks = styled.nav<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  background-color: ${(props) => props.theme.background};
  padding: 10px;
`;

const Link = styled.a`
  display: block;
  margin: 5px 0;
  text-decoration: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
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
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
  }
`;

const PostsPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Hook para navegação

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

  // Busca as postagens do BFF
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          params: { page: 1, limit: 10 },
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        setPosts(response.data); // Define os dados retornados pelo back-end
        setFilteredPosts(response.data); // Inicializa o estado filtrado
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
        alert("Erro ao carregar postagens. Verifique sua autenticação.");
      }
    };

    fetchPosts();
  }, []);

  const redirectToPost = (id: number) => {
    console.log('redirectToPost', `/detalhePost/${id}`)
    router.push(`/detalhePost/${id}`); // Redireciona para a página de leitura da postagem
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>
          <h1>Posts</h1>
          <div>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            <ThemeToggleButton onClick={toggleTheme}>Alterar Tema</ThemeToggleButton>
          </div>
        </Header>
        <HamburgerMenu onClick={toggleMenu}>
          <span>☰ Menu</span>
        </HamburgerMenu>
        <MenuLinks open={menuOpen}>
          <Link href="/posts">Posts</Link>
          <Link href="/admin">Administração</Link>
        </MenuLinks>
        <SearchBar
          type="text"
          placeholder="Buscar posts por título ou conteúdo..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <main>
          <h2>Lista de Postagens</h2>
          <PostList>
            {filteredPosts.map((post: any) => (
              <PostItem key={post.id} onClick={() => redirectToPost(post.id)}>
                <h3>{post.titulo}</h3>
                <p>
                  {post.conteudo.length > 50
                    ? `${post.conteudo.substring(0, 50)}...`
                    : post.conteudo}
                </p>
                <small>Usuário ID: {post.usuarioid}</small>
              </PostItem>
            ))}
          </PostList>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default PostsPage;

*/

"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header"; // Importando o Header
import Sidebar from "@/components/Sidebar"; // Importando o Sidebar

// Estilização
const Container = styled.div`
  margin-left: 200px; /* Espaço reservado para a Sidebar */
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
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
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
  }
`;

const PostsPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
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

  // Busca as postagens do BFF
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/postagem", {
          params: { page: 1, limit: 10 },
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        setPosts(response.data); // Define os dados retornados pelo back-end
        setFilteredPosts(response.data); // Inicializa o estado filtrado
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
        alert("Erro ao carregar postagens. Verifique sua autenticação.");
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
        {/* Sidebar com links de navegação */}
        <Sidebar
          links={[
            { label: "Posts", href: "/posts" },
            { label: "Administração", href: "/admin" },
          ]}
        />

        {/* Container principal da página */}
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
            <PostList>
              {filteredPosts.map((post: any) => (
                <PostItem key={post.id} onClick={() => redirectToPost(post.id)}>
                  <h3>{post.titulo}</h3>
                  <p>
                    {post.conteudo.length > 50
                      ? `${post.conteudo.substring(0, 50)}...`
                      : post.conteudo}
                  </p>
                  <small>Usuário ID: {post.usuarioid}</small>
                </PostItem>
              ))}
            </PostList>
          </main>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default PostsPage;