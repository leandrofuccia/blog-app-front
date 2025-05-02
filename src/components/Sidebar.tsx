"use client";

import React, { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div<{ open: boolean }>`
  width: ${(props) => (props.open ? "200px" : "0")};
  overflow: hidden;
  transition: width 0.3s ease;
  background-color: ${(props) => props.theme.background};
  border-right: 1px solid ${(props) => props.theme.color};
  height: 100vh;
  position: fixed;
`;

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  background-color: ${(props) => props.theme.background};
  border-bottom: 1px solid ${(props) => props.theme.color};
`;

const MenuLinks = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 10px;
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
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
    </>
  );
};

export default Sidebar;