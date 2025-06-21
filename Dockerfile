FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y mysql-server
RUN npm install

COPY . .

RUN npm i sequelize-cli -g

EXPOSE 3000

CMD ["npm", "start"]