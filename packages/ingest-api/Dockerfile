FROM node:22-alpine

WORKDIR /app

COPY . .
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @logtracker/ingest-api build

CMD ["pnpm", "--filter", "@logtracker/ingest-api", "start"]
