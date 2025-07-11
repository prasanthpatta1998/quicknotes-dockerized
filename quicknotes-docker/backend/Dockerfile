# Builder stage
FROM node:22-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# Production stage with distroless
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /app
COPY --from=builder /app .

ENV NODE_ENV=production

CMD ["server.js"]
