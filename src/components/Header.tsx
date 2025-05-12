/*"use client";

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

export default Header;*/

"use client";

import React from "react";
import styled from "styled-components";
import { useThemeToggle } from "@/context/ThemeContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.color};
  color: ${(props) => props.theme.color};
  transition: background-color 0.3s, color 0.3s;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.color};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: transparent;
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.color};
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
  }
`;

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { toggleTheme } = useThemeToggle();

  return (
    <HeaderContainer>
      <Title>Minha Aplicação</Title>
      <ButtonGroup>
        <Button onClick={onLogout}>Logout</Button>
        <Button onClick={toggleTheme}>Alterar Tema</Button>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;
