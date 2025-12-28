FROM node:22-alpine

WORKDIR /app

COPY . .
RUN cd packages && rm -rf $(ls | grep -Ev '^(worker|shared|core)$')
RUN cd /app

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @logtracker/worker build

CMD ["pnpm", "--filter", "@logtracker/worker", "start"]
