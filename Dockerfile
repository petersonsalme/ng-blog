#FROM node:latest as node

#WORKDIR /app

#COPY package*.json /app

#RUN npm i npm@latest -g
# RUN npm install

# COPY ./ /app

# RUN npm run build:ssr

FROM nginx:latest

# COPY --from=node /app/dist/ng-blog/browser /usr/share/nginx/html
RUN mkdir -p /app

COPY ./dist/ng-blog /app

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf