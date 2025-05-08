FROM node:lts-alpine

ARG UID
ARG GID
ARG TIMEZONE

RUN apk --no-cache update && apk add --no-cache shadow sudo

RUN groupadd -g ${GID} container

RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/admin && chmod 0440 /etc/sudoers.d/admin

RUN ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime

RUN usermod -aG container node

USER node

RUN npm install --save-dev @nestjs/cli nodemon

WORKDIR /home/node

COPY ./docker/node/init.sh ./

RUN sudo chmod +x init.sh

CMD ["sh", "-c", "/home/node/init.sh"]
