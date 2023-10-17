# specify the node base image with your desired version node:<version>
FROM node:lts-alpine

# replace this with your application's default port
EXPOSE 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

CMD [ "npm", "run", "start:production" ]
