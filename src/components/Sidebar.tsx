/*"use client";

import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const SidebarContainer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
  width: ${(props) => (props.open ? "200px" : "0")};
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 10;

  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: -1px;
    width: 1px;
    height: 100%;
    background-color: ${(props) => props.theme.color};
    z-index: 11;
  }
`;


const HamburgerMenu = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 8px 12px;
  background-color: transparent; 
  color: ${(props) => props.theme.color};
  border: none;
`;


const MenuLinks = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 40px;
`;

const Link = styled.a`
  margin: 10px 0;
  text-decoration: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

interface SidebarProps {
  links: { label: string; href: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <Wrapper>
      <HamburgerMenu onClick={toggleMenu}>
        <span>☰ Menu</span>
      </HamburgerMenu>
      <SidebarContainer open={menuOpen}>
        <MenuLinks>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </MenuLinks>
      </SidebarContainer>
    </Wrapper>
  );
};

export default Sidebar;

*/


"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

type LinkItem = {
  label: string;
  href: string;
};

type SidebarProps = {
  links: LinkItem[];
};

const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.3s ease;
  z-index: 1000;
  width: 250px;

  /* Mobile: oculta se !$isOpen */
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});

  @media (min-width: 768px) {
    transform: translateX(0); /* Sempre visível no desktop */
  }
`;

const MainWrapper = styled.main`
  margin-left: 250px;
  padding: 16px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1100;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const SidebarMenu = styled.ul`
  list-style: none;
  padding: 80px 0 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 16px 24px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.md};

    &:hover {
      color: ${({ theme }) => theme.colors.background};
      background-color: ${({ theme }) => theme.colors.primary};
      display: block;
    }
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? "Fechar" : "Menu"}
      </ToggleButton>

      <SidebarWrapper $isOpen={isOpen}>
        <SidebarMenu>
          {links.map((link) => (
            <MenuItem key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </MenuItem>
          ))}
        </SidebarMenu>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
