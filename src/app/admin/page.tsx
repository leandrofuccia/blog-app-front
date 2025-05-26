"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Heading3,
  Paragraph,  
  PostItemFlex,
  PostList,
  HeaderActions,
  ResponsiveContainer,
  MainWrapper,
  ButtonGroup,
  SuccessPopup,
  ErrorPopup,
  WarningPopup,
  Heading4,
  
  
} from "@/components/Common";
import Loading from "@/components/Loading";
import IconButton from "@/components/IconButton";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [userProfile, setUserProfile] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setErrorMessage(null);
        setWarningMessage(null);
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
            setWarningMessage("Acesso restrito. Apenas professores podem acessar essa página.");
            setTimeout(() => {
                  setSuccessMessage(null);
                  router.push("/posts");
                }, 2000);
          }
        }

      } catch (error: any) {
        console.error("Erro ao verificar perfil do usuário:", error);
        const message = error?.response?.data?.message || 'Erro ao verificar perfil do usuário.';
        setErrorMessage(message);
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
        setIsLoading(false);
      } catch (error: any) {
        const message = error?.response?.data?.message || 'Erro ao buscar postagens.';
        setErrorMessage(message);
        setIsLoading(false);
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
      setSuccessMessage("Postagem excuida com sucesso!");
      
    } catch (error: any) {
      console.error("Erro ao excluir postagem:", error);
      const message = error?.response?.data?.message || 'Erro ao excluir postagem.';
      setErrorMessage(message);
      
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
  
  if (isLoading || !posts) {
    return <Loading />;
  }

  return (
    <>
      <Sidebar links={[{ label: "Posts", href: "/posts" }, { label: "Administração", href: "/admin" }]} />
      <MainWrapper>
        <Header onLogout={handleLogout} />
        <ResponsiveContainer>
          <HeaderActions>
            <Heading4>Administração de Postagens</Heading4>
            {successMessage && (
              <SuccessPopup>
                {successMessage}
                <button onClick={() => setSuccessMessage(null)}>✖</button>
              </SuccessPopup>
            )}
            {errorMessage && (
              <ErrorPopup>
                {errorMessage}
                <button onClick={() => setErrorMessage(null)}>✖</button>
              </ErrorPopup>
            )}
            {warningMessage && (
              <WarningPopup>
                {warningMessage}
                <button onClick={() => setWarningMessage(null)}>✖</button>
              </WarningPopup>
            )}

            <IconButton
              icon= "/icons/add.svg"
              alt=""
              tooltip=""
              label="Criar Nova Postagem"
              onClick={handleCreate}
              showLabel = "side"
              labelSize="lg"
            />
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
                  <ButtonGroup>
                    <IconButton
                      icon= "/icons/edit.svg"
                      alt=""
                      tooltip="Editar"
                      label="Editar"
                      onClick={() => handleEdit(post.id)}
                    />

                     <IconButton
                      icon= "/icons/delete.png"
                      alt=""
                      tooltip="Excluir"
                      label="Excluir"
                      onClick={() => handleDelete(post.id)}
                    />
                  </ButtonGroup>

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
