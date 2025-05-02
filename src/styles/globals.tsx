import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  input, button {
    font-family: inherit;
    font-size: 16px;
  }
`;