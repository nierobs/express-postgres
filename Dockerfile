FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
USER node
COPY . ./
EXPOSE 8080
CMD node server.js
