/*"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useParams } from "next/navigation";
import { IPostagem } from "@/types/postagem";

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

const PostContent = styled.div`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const ReadPostPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [post, setPost] = useState<IPostagem | null>(null); // Definindo o tipo como IPostagem ou null
  const params = useParams();

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
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePostagem/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        setPost(response.data); // Define os dados retornados pelo back-end
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
      <Container>
        <Header>
          <h1>Postagem</h1>
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
        <PostContent>
          <h2>{post.titulo}</h2>
          <p>{post.conteudo}</p>
          <small>Usuário ID: {post.usuarioid}</small>
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
      </Container>
    </ThemeProvider>
  );
};

export default ReadPostPage;

*/

/*"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useParams } from "next/navigation";
import { IPostagem } from "@/types/postagem";
import Header from "@/components/Header"; // Importa o Header
import Sidebar from "@/components/Sidebar"; // Importa o Sidebar

// Estilização
const Container = styled.div`
  margin-left: 200px;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

const PostContent = styled.div`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const ReadPostPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [post, setPost] = useState<IPostagem | null>(null); // Definindo o tipo como IPostagem ou null
  const params = useParams();

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redireciona para login
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePostagem/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });
        setPost(response.data); // Define os dados retornados pelo back-end
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
        
        <Sidebar
          links={[
            { label: "Posts", href: "/posts" },
            { label: "Administração", href: "/admin" },
          ]}
        />
        
                <Container>
          <Header onLogout={handleLogout} onToggleTheme={toggleTheme} />
          <PostContent>
            <h2>{post.titulo}</h2>
            <p>{post.conteudo}</p>
            <small>Usuário ID: {post.usuarioid}</small>
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
        </Container>
      </>
    </ThemeProvider>
  );
};

export default ReadPostPage;

*/

"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useParams } from "next/navigation";
import { IPostagem } from "@/types/postagem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// Estilização
const Container = styled.div`
  margin-left: 200px; /* Espaço reservado para a Sidebar */
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

const PostContent = styled.div`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

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