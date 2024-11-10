# Dockerfile para o Frontend
# Use a imagem do Node.js como base
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Constrói a aplicação React
RUN npm run build

# Usa a imagem Nginx para servir o conteúdo estático
FROM nginx:alpine

# Copia os arquivos da build para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta que o Nginx está escutando
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
