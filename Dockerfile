FROM node:20-alpine AS base

FROM base as build
WORKDIR /source
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM base AS runner
WORKDIR /app
RUN apk --no-cache add curl
RUN apk --no-cache add aws-cli
RUN adduser --system --uid 1001 nodejs
COPY --from=build /source/dist ./dist
COPY --from=build /source/package.json /source/package-lock.json ./
RUN npm ci
RUN npm install -g .
USER nodejs

CMD ["retransfer"]