# Stage 1: Build with Vite
FROM node:22-alpine as builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install || cat /root/.npm/_logs/*debug*.log

# Copy rest of the code and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Clear default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
