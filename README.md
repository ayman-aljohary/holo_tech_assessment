# Holo Backend Technical Assessment
* author: Ayman Aljohary
* email: ayman.aljohary.00@gmail.com

__________________________


### Docker installation
* docker-compose build
* docker-compose up -d
* Open http://localhost:3000

__________________________

### Project setup & DB creation
$ npm install && npx sequelize-cli db:create && npx sequelize-cli db:migrate
+ Note: make sure to change db config in [`config/config.json`, `src/app.module.ts`]
__________________________

### Compile and run the project
#### development
$ npm run start
#### watch mode
$ npm run start:dev
#### production mode
$ npm run start:prod

__________________________

### Run tests
#### unit tests
$ npm run test



