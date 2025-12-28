FROM node:22-alpine

WORKDIR /app

COPY . .
RUN cd packages && rm -rf $(ls | grep -Ev '^(admin-api|shared|core)$')
RUN cd /app

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @logtracker/admin-api build

EXPOSE 4003
CMD ["pnpm", "--filter", "@logtracker/admin-api", "start"]
