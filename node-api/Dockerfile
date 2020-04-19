FROM node:alpine AS build

WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM node:alpine

WORKDIR /app

ENV NODE_ENV production
EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s CMD wget -O- -q http://localhost:3000/.healthcheck || exit 1

COPY package*.json ./
COPY --from=build /app/dist .

RUN npm i --production


