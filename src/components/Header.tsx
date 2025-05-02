"use client";

import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.color};
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

interface HeaderProps {
  onLogout: () => void;
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onToggleTheme }) => {
  return (
    <HeaderContainer>
      <h1>Minha Aplicação</h1>
      <div>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
        <ThemeToggleButton onClick={onToggleTheme}>Alterar Tema</ThemeToggleButton>
      </div>
    </HeaderContainer>
  );
};

export default Header;