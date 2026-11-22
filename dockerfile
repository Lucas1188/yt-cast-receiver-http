FROM node:20-alpine
LABEL org.opencontainers.image.source=https://github.com/Lucas1188/yt-cast-receiver-http
LABEL org.opencontainers.image.description="Fork of yt-cast-receiver with HTTP player functionality"
LABEL org.opencontainers.image.licenses=MIT
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force --ignore-scripts
COPY . .
RUN npm run build
ENTRYPOINT ["npm", "run", "http-player"]
