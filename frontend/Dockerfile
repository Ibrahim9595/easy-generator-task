# Stage 1: Build the Vite app
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source and build
COPY . .
RUN npm run build

# Stage 2: Serve with http-server
FROM node:22-alpine AS runner

# Install http-server globally
RUN npm install -g http-server

# Copy built files
WORKDIR /app
COPY --from=builder /app/dist ./dist

# Expose the default port
EXPOSE 8080

# Serve using http-server
CMD ["http-server", "dist", "-p", "8080"]
