FROM php:7.3-fpm-alpine

WORKDIR /var/www/html

COPY . .

RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN docker-php-ext-install bcmath

#RUN docker-php-ext-install gmp bcmath

RUN docker-php-ext-configure pcntl --enable-pcntl \
  && docker-php-ext-install \
    pcntl

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel

USER laravel 
 
# RUN chown -R laravel:laravel .