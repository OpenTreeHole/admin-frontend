FROM node:lts-alpine AS builder

RUN apk update && apk upgrade

ENV PNPM_HOME="/pnpm" PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

RUN corepack enable pnpm \
    && pnpm install --frozen-lockfile \
    && pnpm build

FROM node:lts-alpine

RUN apk add dumb-init \
    && adduser -D nuxt 

USER nuxt

COPY --from=builder --chown=nuxt:nuxt /app/.output /app
WORKDIR /app

ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production

EXPOSE 8080
CMD ["dumb-init","node","/app/server/index.mjs"]
