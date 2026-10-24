# syntax=docker/dockerfile:1
ARG NODE_VERSION=24

# --- 1. Зависимости -----------------------------------------------------------
# Отдельный слой: пересобирается только при изменении package.json/package-lock.json
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
ENV NUXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
# postinstall ("nuxt prepare") пропускаем: исходников в этом слое ещё нет,
# каталог .nuxt подготовит сам `nuxt build`
RUN npm ci --ignore-scripts

# --- 2. Сборка приложения -----------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
ENV NUXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- 3. Рантайм ---------------------------------------------------------------
# Только собранный .output: Nitro кладёт свои зависимости в .output/server/node_modules
FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    NUXT_TELEMETRY_DISABLED=1
COPY --from=build --chown=node:node /app/.output ./.output
USER node
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
