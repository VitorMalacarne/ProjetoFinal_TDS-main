# Dockerfile para o Backend
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências dentro do contêiner
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Define a variável de ambiente para a porta
ENV PORT=5000

# Exponha a porta em que o servidor estará escutando
EXPOSE 5000

# Inicia a aplicação
CMD ["node", "server.js"]
