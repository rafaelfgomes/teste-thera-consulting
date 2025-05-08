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

WORKDIR /api

COPY ./docker/nestjs/package*.json ./

RUN npm install

RUN npm install --save-dev @nestjs/cli nodemon

RUN npm run build

FROM node:lts-alpine

ENV DATABASE_HOST=${DB_HOST}
ENV DATABASE_PORT=${DB_PORT}
ENV DATABASE_USER=${DB_USER}
ENV DATABASE_PASSWORD=${DB_ROOT_PASSWORD}
ENV DATABASE_NAME=${DB_NAME}

WORKDIR /api

COPY ./docker/nestjs/package*.json ./

RUN npm install --omit=dev

COPY --from=dev-env /app/dist ./dist
COPY --from=dev-env /app/node_modules ./node_modules

CMD ["node", "dist/main"]