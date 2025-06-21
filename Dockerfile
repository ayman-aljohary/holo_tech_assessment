FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm i sequelize-cli -g

EXPOSE 3000

CMD ["npm", "start"]