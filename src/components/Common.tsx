/*import styled from "styled-components";

// Container principal
export const Container = styled.div`
  margin-left: 200px;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
`;



// Formulário estilizado
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

// Campo de entrada
export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

// Área de texto
export const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export const Button = styled.button`
  background: transparent;
  color: ${(props) => props.theme.color};
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
  }
`;

export const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export const PostContent = styled.div`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

export const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

// Base PostItem com estilos compartilhados
export const BasePostItem = styled.li`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`;

// PostItem com hover
export const PostItemHover = styled(BasePostItem)`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
  }
`;

// PostItem com flex display
export const PostItemFlex = styled(BasePostItem)`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`;



// Texto de erro
export const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;*/


import styled from "styled-components";
import { Heading2, Heading3, Paragraph } from "./Typography"; // Importe os componentes de tipografia

// Container principal
export const Container = styled.div`
  margin-left: 200px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100vh;
`;

// Formulário estilizado
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
`;

// Campo de entrada
export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// Área de texto
export const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// Botão
export const Button = styled.button`
  padding: ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.fontSizes.md};
  background-color: ${(props) => props.theme.buttonVariants.primary.background};
  color: ${(props) => props.theme.buttonVariants.primary.color};
  border: ${(props) => props.theme.buttonVariants.primary.border};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;

export const Select = styled.select`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const PostContent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

// Base PostItem com estilos compartilhados
export const BasePostItem = styled.li`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

// PostItem com hover
export const PostItemHover = styled(BasePostItem)`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.button.hoverBackground};
    color: ${(props) => props.theme.colors.button.hoverText};
  }
`;

// PostItem com flex display
export const PostItemFlex = styled(BasePostItem)`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  justify-content: space-between;
  align-items: flex-start;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

// Texto de erro
export const ErrorText = styled.div`
  color: red;
  margin-bottom: 10px;
`;

// Container com padding lateral responsivo
export const ResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${(props) => props.theme.spacing.md};
  }
`;

// Cabeçalho com botão de ação (ex: Criar Post)
export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Usando componentes de tipografia
export const Heading2Styled = styled(Heading2)`
  font-size: ${(props) => props.theme.fontSizes.h2};
`;

export const Heading3Styled = styled(Heading3)`
  font-size: ${(props) => props.theme.fontSizes.h3};
`;

export const ParagraphStyled = styled(Paragraph)`
  font-size: ${(props) => props.theme.fontSizes.p};
`;

export { Heading2, Heading3, Paragraph };

export const MainWrapper = styled.div`
  margin-left: 250px;
  padding: 16px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;


export const SuccessPopup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50; // verde sucesso
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  font-weight: bold;
  animation: fadeInOut 3s ease-in-out;

  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-10px); }
  }
`;

export const ErrorPopup = styled(SuccessPopup)`
  background-color: #f44336; /* vermelho */
`;





