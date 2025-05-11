import styled from "styled-components";

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

// Botão
export const Button = styled.button`
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

/*export const PostItem = styled.li`
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
  }
`;
*/

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
`;
