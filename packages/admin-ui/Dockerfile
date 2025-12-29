FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable
COPY package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos build
COPY --from=builder /app/dist /usr/share/nginx/html

# Runtime env
COPY env.template.js /usr/share/nginx/html/env.template.js
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
