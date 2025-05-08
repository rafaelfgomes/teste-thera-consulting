ARG DB_NAME
ARG DB_ROOT_PASSWORD
ARG DB_PORT
ARG DB_HOST
ARG DB_USER

FROM node:lts-alpine as dev-env

ENV DATABASE_HOST=${DB_HOST}
ENV DATABASE_PORT=${DB_PORT}
ENV DATABASE_USER=${DB_USER}
ENV DATABASE_PASSWORD=${DB_ROOT_PASSWORD}
ENV DATABASE_NAME=${DB_NAME}

WORKDIR /app

COPY ./docker/nextjs/package*.json ./

RUN npm install

RUN npm run build

FROM node:lts-alpine

ENV DATABASE_HOST=${DB_HOST}
ENV DATABASE_PORT=${DB_PORT}
ENV DATABASE_USER=${DB_USER}
ENV DATABASE_PASSWORD=${DB_ROOT_PASSWORD}
ENV DATABASE_NAME=${DB_NAME}

WORKDIR /app

COPY ./docker/nextjs/package*.json ./

RUN npm install --only=production

COPY --from=dev-env /app/dist ./dist

CMD ["node", "dist/main"]