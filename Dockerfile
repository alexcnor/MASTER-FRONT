FROM node:14.16.0-alpine as build

WORKDIR app

ARG CLIENT_ID
ARG TENANT_ID
ARG REDIRECT_URI
ARG BACKEND

ENV REACT_APP_CLIENT_ID $CLIENT_ID
ENV REACT_APP_TENANT_ID $TENANT_ID
ENV REACT_APP_REDIRECT_URI $REDIRECT_URI
ENV REACT_APP_BACKEND $BACKEND

COPY package.json ./

RUN npm install
COPY . ./
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /var/www/html
COPY config/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
