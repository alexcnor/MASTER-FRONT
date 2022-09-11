FROM nginx:stable-alpine

ENV CLIENT_ID=CLIENT_ID
ENV TENANT_ID=TENANT_ID
ENV REDIRECT_URI=REDIRECT_URI

COPY ./build /var/www/html
COPY config/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
