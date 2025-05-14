FROM node:lts-alpine AS dev-env

ARG GID
ARG TIMEZONE

RUN apk --no-cache update && apk add --no-cache shadow sudo

RUN groupadd -g ${GID} container

RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/admin && chmod 0440 /etc/sudoers.d/admin

RUN ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime

RUN usermod -aG container node

WORKDIR /scripts

COPY ./docker/api/init.sh ./

RUN chmod +x init.sh

WORKDIR /api

USER node

CMD ["sh", "-c", "/scripts/init.sh"]