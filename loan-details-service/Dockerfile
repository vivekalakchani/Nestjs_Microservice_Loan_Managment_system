FROM node:18-alpine3.17

WORKDIR /usr/loan

COPY package.json .

RUN npm install

COPY . .


CMD ["npm", "run", "start:dev"]
