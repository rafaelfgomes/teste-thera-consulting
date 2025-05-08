FROM node:lts-alpine

ARG UID
ARG GID
ARG TIMEZONE

RUN apk --no-cache update && apk add --no-cache shadow sudo

RUN groupadd -g ${GID} container

RUN echo "admin ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/admin && chmod 0440 /etc/sudoers.d/admin

RUN ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime

WORKDIR /app

RUN chown -R node:container .

COPY package*.json ./

USER node

EXPOSE 3001

CMD ["tail", "-f", "/dev/null"]
