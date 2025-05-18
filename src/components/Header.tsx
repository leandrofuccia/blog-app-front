/*"use client";

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
  margin-left: 250px; 
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
*/

"use client";

import React from "react";
import styled from "styled-components";
import { Title } from "./Typography";
import { useThemeToggle } from "@/context/ThemeContext";
import {ButtonGroup} from "@/components/Common"
import IconButton from "./IconButton";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: ${(props) => props.theme.colors.background};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  margin-left: 250px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 60px;
  }
`;

/*const HeaderButton = styled.button`
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
*/


interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { toggleTheme, isDark } = useThemeToggle();
  return (
    <HeaderContainer>
      <Title>Minha Aplicação</Title>
      <ButtonGroup>
        <IconButton
          icon={isDark ? "/icons/sun.svg" : "/icons/moon.svg"}
          alt=""
          tooltip={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          label={isDark ? "Tema claro" : "Tema escuro"}
          onClick={toggleTheme}
        />
        <IconButton
          icon= "/icons/logout.png"
          alt=""
          tooltip="Logout"
          label="Logout"
          showLabel="none" // "side", "below" ou "none"
          onClick={onLogout}
        />
      </ButtonGroup>
    </HeaderContainer>
  );
};

export default Header;
