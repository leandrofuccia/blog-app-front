# Usando a imagem oficial do Node.js
FROM node:23-alpine

# Definindo o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiando apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json /app/

# Instalando as dependências
RUN npm install

# Copiando o restante do código da aplicação
COPY . .

# Construindo a aplicação Next.js
RUN npm run build

# Definindo a porta e o comando de inicialização
EXPOSE 3000

CMD ["npm", "run", "dev"]
