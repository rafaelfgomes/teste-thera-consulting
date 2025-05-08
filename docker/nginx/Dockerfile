FROM nginx:mainline-alpine

ARG TIMEZONE

RUN ln -sf /usr/share/zoneinfo/${TIMEZONE} /etc/localtime

WORKDIR /var/www/html

ENTRYPOINT [ "nginx" ]

CMD [ "-g", "daemon off;" ]