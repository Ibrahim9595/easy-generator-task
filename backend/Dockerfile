# Builder image
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm i -g @nestjs/cli
RUN npm run build

# Final image
FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./
COPY nest-cli.json ./
COPY --from=builder /app/dist ./dist

RUN npm i --omit=dev

EXPOSE 3000
