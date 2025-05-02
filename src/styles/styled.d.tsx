import "styled-components";

// Declare os tipos do tema para o styled-components
declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    color: string;
  }
}