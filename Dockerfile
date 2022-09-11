FROM node:14.16.0-alpine as build

WORKDIR app

ARG CLIENT_ID
ARG TENANT_ID
ARG REDIRECT_URI

ENV CLIENT_ID $CLIENT_ID
ENV TENANT_ID $TENANT_ID
ENV REDIRECT_URI $REDIRECT_URI

COPY package.json ./

RUN npm install
COPY . ./
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /var/www/html
COPY config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
