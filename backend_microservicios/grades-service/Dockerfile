FROM node:18

WORKDIR /app

# Copia y instala dependencias
COPY package.json package-lock.json ./
RUN npm install --production
RUN npm install -g @nestjs/cli
# Copia el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 4003

# Ejecutar la aplicación (NestJS ya compilado en dist/)
CMD ["node", "dist/main"]
