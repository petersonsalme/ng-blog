FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .
COPY src/ .

USER node

RUN npm install

# COPY --chown=node:node . .

EXPOSE 8000

CMD [ "node", "server.js" ]