FROM node:lts-alpine AS dev-env

ARG UID
ARG GID
ARG TIMEZONE
ARG DB_NAME
ARG DB_ROOT_PASSWORD
ARG DB_PORT
ARG DB_HOST
ARG DB_USER

ENV DATABASE_HOST=${DB_HOST}
ENV DATABASE_PORT=${DB_PORT}
ENV DATABASE_USER=${DB_USER}
ENV DATABASE_PASSWORD=${DB_ROOT_PASSWORD}
ENV DATABASE_NAME=${DB_NAME}

RUN apk --no-cache update && apk add --no-cache shadow sudo

RUN groupadd -g ${GID} container

RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/admin && chmod 0440 /etc/sudoers.d/admin

RUN ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime

RUN usermod -aG container node

WORKDIR /scripts

COPY ./docker/nestjs/init.sh ./

RUN chmod +x init.sh

WORKDIR /api

USER node

CMD ["sh", "-c", "/scripts/init.sh"]