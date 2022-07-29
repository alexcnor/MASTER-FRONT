FROM nginx:stable-alpine

COPY ./build /var/www/localhost/htdocs/build
COPY config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
