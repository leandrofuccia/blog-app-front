"use client";

import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import jwt from "jsonwebtoken";

// Estilização
const Container = styled.div`
  margin-left: 200px; /* Espaço reservado para a Sidebar */
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

const Button = styled.button`
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

const CreatePostPage = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [autores, setAutores] = useState([]);
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redireciona para login
  };

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

      setAutores(response.data); // Lista de autores
    } catch (error) {
      console.error("Erro ao buscar autores:", error);
      alert("Erro ao carregar lista de autores.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/createPostagem",
        { titulo, conteudo, usuarioid: autorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Postagem criada:", response.data);
      alert("Postagem criada com sucesso!");
      router.push("/admin"); // Redireciona para a página de administração
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
      alert("Erro ao criar postagem. Verifique os dados informados.");
    }
  };

  useEffect(() => {
    verifyProfile(); // Verifica o perfil do usuário
    fetchAutores(); // Carrega os autores para o combobox
  }, []);

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
          <h2>Criar Nova Postagem</h2>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <Textarea
              placeholder="Conteúdo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              rows={10}
              required
            />
            <Select
              value={autorId}
              onChange={(e) => setAutorId(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione o Autor
              </option>
              {autores
                .filter((autor: any) => autor.perfilid === 2) // Filtra apenas os autores com perfilid = 2 (professores)
                .map((autor: any) => (
              <option key={autor.id} value={autor.id}>
              {autor.nome}
            </option>
            ))}

            </Select>
            <Button type="submit">Criar Postagem</Button>
          </Form>
        </Container>
      </>
    </ThemeProvider>
  );
};

export default CreatePostPage;