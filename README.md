# Documentação do Tech-challenge - Fase 3

Atualmente, a maioria de professores e professoras da rede pública de educação não têm plataformas onde postar suas aulas e transmitir conhecimento para alunos e alunas de forma prática, centralizada e tecnológica. Para solucionar esse problema, criamos uma aplicação de blogging dinâmico. Este documento descreve a arquitetura e o funcionamento da aplicação.

Conforme requisitos técnicos, foi desenvolvido um front-end utilizando React para a aplicação de blogging dinâmico. Agora os docentes e alunos(as) poderão interagir com os diversos endpoints REST existentes através de uma interface gráfica responsiva, intuitiva e fácil de usar.

A aplicação possui 2 perfis de uso (Professor e Aluno), com autenticação. As funcionalidades comuns a ambos os perfis são compartilhadas (visualização de postagens existentes de todos os professores autores) e as demais permanecem restritas ao perfil Professor (criar, editar e excluir postagens).

---

## Arquitetura da Camada de Frontend (React + Next.js)

#### 1. **Componentização**
- A interface é baseada em **componentes reutilizáveis**, incluindo `Header`, `Sidebar`, `Loading` e vários elementos estilizados (`Button`, `Input`, `SuccessPopup`, etc.).
- Usa **Styled Components** para estilização modular, permitindo temas dinâmicos e melhor manutenção do código.

#### 2. **Gerenciamento de Estado**
- Utiliza `useState` para controle de estados locais (`errorMessage`, `successMessage`, `isLoading`).
- `useEffect` é utilizado para carregar dados e realizar verificações na montagem dos componentes (`verifyProfile` e `fetchAutores`).
- O **Formik** e **Yup** são usados para gerenciamento e validação de formulários, garantindo consistência nos dados.

#### 3. **Comunicação entre Componentes**
- Uso de `props` para comunicação entre componentes (`Header`, `Sidebar`).
- Implementação de manipulação de eventos e interação direta com formulários (`handleSubmit`, `resetForm`).

#### 4. **Integração com Backend**
- Consumo de APIs usando **Axios**, com autenticação via `Bearer Token`.
- Comunicação com endpoints protegidos (`/api/usuario`, `/api/createPostagem`, `/api/login`).
- Decodificação de JWT para validação de credenciais (`jwt.decode(token)`).

#### 5. **Roteamento e Navegação**
- Gerenciado com **Next.js Router** (`useRouter()`), facilitando redirecionamentos (`router.push('/posts')`).
- Implementação de verificações de acesso baseadas no perfil do usuário (`verifyProfile`).

#### 6. **Validação de Dados**
- **Yup** é utilizado para definir regras nos formulários (`validationSchema`).
- Garante que campos obrigatórios sejam preenchidos corretamente antes do envio.

#### 7. **Estilização e Temas**
- **Styled Components** usado para estilização global e tema dinâmico (`lightTheme`,`darkTheme`).
- Usa variáveis para controlar cores, espaçamentos e fontes.
  
#### 8. **Performance e Boas Práticas:**
- Uso de **Lazy Loading** (`Loading` para estados de carregamento).
- Prevenção de renderizações desnecessárias através do gerenciamento eficiente de estado.
- Uso de `localStorage` para persistência de credenciais sem necessidade de requisições constantes.

#### 9. **Automação e Deploy:**
- CI/CD com GitHub Actions para build automático, publicação de imagens Docker no Docker Hub e configuração com Dockerfile.

---

## Setup Inicial

Este guia orienta o usuário a baixar e executar a aplicação utilizando a imagem Docker disponível no Docker Hub.

#### **1. Requisitos**

Antes de começar, certifique-se de ter as seguintes ferramentas e aplicações instaladas e em execução no seu sistema:

- **Docker**:
  - Versão recomendada: 20.10.7 ou superior
  - [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**:
  - Versão recomendada: 2.0.0 ou superior
  - Incluído no Docker Desktop ou pode ser instalado separadamente:
    [Instalar Docker Compose](https://docs.docker.com/compose/install/)
- **Backend da aplicação Blogging Dinâmico**
  - A API do sistema deve estar em execução.
  - [Configurar API](https://github.com/leandrofuccia/blog-app)

#### **2. Baixando a Imagem do Docker Hub**

A imagem da aplicação está disponível no repositório do Docker Hub [leandrofuccia/blog-app-front](https://hub.docker.com/r/leandrofuccia/blog-app-front).

1. Execute o seguinte comando para baixar a última versão da imagem:
   ```bash
   docker pull leandrofuccia/blog-app-front:latest
   ```

#### **3. Baixando o Arquivo Docker Compose**

O arquivo [docker-compose.yml](https://raw.githubusercontent.com/leandrofuccia/blog-app-front/refs/heads/master/docker-compose.yml) está disponível no repositório do GitHub [leandrofuccia/blog-app-front](https://github.com/leandrofuccia/blog-app-front). Faça o download em uma pasta local.

#### **4. Criando a rede compartilhada**

Antes de subir os serviços com docker-compose, crie a rede compartilhada:

   ```bash
   docker network create app-network
   ```

#### **5. Iniciando os Contêineres**

1. Na mesma pasta onde se encontra o arquivo `docker-compose.yml`, execute o comando abaixo para iniciar os contêineres:

   ```bash
   docker compose up -d
   ```
2. Após a execução, verifique se os contêineres estão funcionando:

   ```bash
   docker ps
   ```

> Os serviços devem incluir:
>
> - `blog_app_front`: Aplicação

#### **6. Testando a Aplicação**

1. Acesse a aplicação no navegador:

   ```
   http://localhost:3000/
   ```
2. Verifique se houve o redirecionamento automático para a página de login.

#### **7. Encerrando os Contêineres**

Para parar e remover os contêineres, execute:

```bash
docker compose down
```

---

## Guia de Uso da aplicação

Este guia tem como objetivo orientar o uso do sistema de blogging dinâmico, disponível após Setup Inicial no endereço: [http://localhost:3000/](http://localhost:3000/).

### **1. Página de Login (Tela Inicial)**
**Objetivo:** Autenticar o usuário antes de permitir o acesso ao sistema.  
#### **Passos do Usuário:**  
1. Acessar a página de login.
2. Preencher os campos:
   - **E-mail**
   - **Senha**
3. Clicar no botão **Entrar**.
4. Caso as credenciais sejam válidas, o usuário é redirecionado para a **Página Principal**.
5. Se o usuário ainda **não tiver uma conta**, clicar no link **"Criar Conta"** para ir à página de registro.

### **2. Página de Criação de Conta**
**Objetivo:** Permitir que novos usuários se registrem no sistema.  
#### **Passos do Usuário:**  
1. Acessar a página de criação de conta através do link na **Página de Login**.
2. Preencher os seguintes campos:
   - **Nome**
   - **Senha**
   - **E-mail**
   - **Perfil** (Aluno ou Professor)
3. Clicar no botão **Cadastrar**.
4. O sistema valida os dados e cria a conta.
5. Após o sucesso, o usuário é redirecionado para a **Página de Login** para autenticação.

### **3. Lista de Postagens (Página Principal)**
**Objetivo:** Exibir a lista de postagens disponíveis.  
#### **Passos do Usuário:**  
1. Após o login, o usuário acessa a **Lista de Postagens**.
2. A página exibe:
   - Lista de postagens com título, parte do conteúdo e autor.
   - Um campo de **busca** para filtrar posts por palavras-chave (seja no título ou no conteúdo).
3. O usuário pode clicar em um post para acessar seu conteúdo completo.

### **4. Página de Leitura de Post**
**Objetivo:** Exibir o conteúdo completo de uma postagem.
#### **Passos do Usuário:**  
1. Selecionar um post na **Lista de Postagens**.
2. A página do post carregará:
   - Título
   - Conteúdo completo
   - Autor
   - Datas de criação e atualização da postagem
3. Clica em Voltar para retornar à **Lista de Postagens**.

### **5. Página de Criação de Postagens** (Apenas para professores)
**Objetivo:** Permitir que docentes publiquem postagens.  
#### **Passos do Usuário:**  
1. Após login, o professor acessa a página **Administração de Postagens** clicando no menu "Administração".
2. Clica em "Criar Nova Postagem".
3. Preenche o formulário com:
   - **Título**
   - **Conteúdo**
   - **Autor**
4. Clica no botão **Criar Postagem**.
5. Se a postagem for criada com sucesso, o sistema exibe uma mensagem de confirmação.
6. O sistema retorna automaticamente para a página **Administração de Postagens**.

### **6. Página Administrativa** (Apenas para professores)
**Objetivo:** Gerenciar postagens.  
#### **Passos do Usuário:**  
1. O professor acessa a página **Administração de Postagens** clicando no menu "Administração".
2. Visualiza todas as postagens.
3. Caso deseje editar um post, clica no respectivo botão **Editar**.
4. Modifica os campos desejados e clica em **Salvar Alterações**.
5. O sistema atualiza a postagem, exibe uma mensagem de sucesso e retorna automaticamente para a página **Administração de Postagens**.
6. Caso deseje excluir um post, clica no respectivo botão **Excluir**.
7. O sistema remove a postagem e exibe uma mensagem de sucesso.

### **7. Mudar tema**
**Objetivo:** Alterar o tema claro para escuro e vice-versa.  
#### **Passos do Usuário:**  
1. Em qualquer página, o usuário pode clicar no botão **Alterar tema**.
2. O sistema altera o tema de claro para escuro ou de escuro para claro dependendo do tema atualmente selecionado.

### **8. Logout**
**Objetivo:** Encerrar a sessão do usuário.  
#### **Passos do Usuário:**  
1. Em qualquer página, o usuário pode clicar em **Logout**.
2. O sistema remove o token de autenticação e redireciona para a **Página de Login**.

---

## Desafios da Equipe nessa fase

Durante o desenvolvimento desta aplicação, enfrentamos uma série de desafios técnicos, fundamentais para o aprendizado e o amadurecimento da equipe.

Após a conclusão das aulas da Fase 3, iniciamos o desenvolvimento. Tivemos de assistir algumas aulas novamente para entender pontos mais complexos, como Styled Components.

Com o auxílio de inteligência artificial, avançamos no desenvolvimento.

O ponto mais desafiador foi criar o recurso de aplicar o tema claro/escuro. Foram muitas tentativas frustradas até que o recurso funcionasse corretamente. O conteúdo das aulas da fase não foram suficientes para entender o mecanismo e a ferramenta de IA utilizada não conseguia trazer o resultado esperado. 

Outro ponto que demandou bastante tempo foi a integração entre as imagens geradas do backend e do frontend através do Docker. Localmente tudo funcionava, mas descobrimos, após muitas tentativas, que era necessário configurar uma rede comum entre as duas camadas. Mesmo configurando uma rede comum, o frontend não "enxergava" o backend. Após a descoberta da limpeza de cache do Docker, conseguimos superar esse grande problema que estava atrapalhando a continuidade dos testes integrados.

Novamente GitHub Actions foi um ponto desafiador. Isso porque, apesar de alterar o código, a esteira não estava sendo inicializada automaticamente. Então optamos por rodá-la manualmente, alcançando o objetivo de publicar as imagens.

---
