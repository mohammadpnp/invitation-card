FROM nginx:stable-alpine

 
WORKDIR /etc/nginx/conf.d
 
COPY ./docker-dev/nginx/nginx.conf .
 
RUN mv nginx.conf default.conf

WORKDIR /var/www/html
 
COPY . .


