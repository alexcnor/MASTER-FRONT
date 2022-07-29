FROM nginx:stable-alpine

COPY ./build /var/www/html
COPY config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
