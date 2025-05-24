"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { IPostagem } from "@/types/postagem";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ErrorPopup, MainWrapper, PostContent } from "@/components/Common";
import Loading from "@/components/Loading";


const ReadPostPage = () => {
  const [post, setPost] = useState<IPostagem | null>(null);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setErrorMessage(null);
        setIsLoading(true); 
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
          setIsLoading(false);
        } catch (error: any) {
          const message = error?.response?.data?.message || "Erro ao buscar autor.";
          setErrorMessage(message);
          setIsLoading(false);
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || "Erro ao buscar postagem.";
        setErrorMessage(message);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (isLoading) {
    return <Loading />;
  }

  if (errorMessage) {
    return (
      <ErrorPopup>
        {errorMessage}
        <button onClick={() => setErrorMessage(null)}>✖</button>
      </ErrorPopup>
    );
  }



  return (
    <>
      <Sidebar
        links={[
          { label: "Posts", href: "/posts" },
          { label: "Administração", href: "/admin" },
        ]}
      />
      <MainWrapper>
        <Header onLogout={handleLogout} onBack={() => router.back()}/>
        <main>
          <PostContent>
            <h2>{post?.titulo}</h2>
            {errorMessage && (
              <ErrorPopup>
                {errorMessage}
                  <button onClick={() => setErrorMessage(null)}>✖</button>
              </ErrorPopup>
            )}
            <p>{post?.conteudo}</p>
            <small>Autor: {post?.autorNome}</small>
            <small>
              Criado em: {new Date(post?.datacriacao!).toLocaleDateString()}
            </small>
            <small>
              Atualizado em:{" "}
              {post?.dataatualizacao
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
