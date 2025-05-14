/*"use client";

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
*/

// src/components/Header.tsx
"use client";

import React from "react";
import styled from "styled-components";
import { Title, ButtonText } from "./Typography";
import { useThemeToggle } from "@/context/ThemeContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  margin-left: 250px; /* ajustável dinamicamente se necessário */
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const HeaderButton = styled.button`
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.background};
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
        <HeaderButton onClick={onLogout}>
          <ButtonText>Logout</ButtonText>
        </HeaderButton>
        <HeaderButton onClick={toggleTheme}>
          <ButtonText>Alterar Tema</ButtonText>
        </HeaderButton>
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;
