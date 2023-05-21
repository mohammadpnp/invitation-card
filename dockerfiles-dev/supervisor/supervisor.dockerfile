# FROM debian:latest
FROM php:7.3-fpm-alpine

# RUN apk-get update && apk add --no-cache supervisor
# RUN apt-get update && apt-get install -y supervisor


RUN mkdir -p "/etc/supervisor/logs"


COPY ./docker-dev/supervisord.conf /etc/supervisor/supervisord.conf

CMD ["/usr/bin/supervisord", "-n", "-c",  "/etc/supervisor/supervisord.conf"]