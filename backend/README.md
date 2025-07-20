## Description

This project is built using [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

- create a .env file and update the values in .env.example

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment

The project includes a Docker file that we can use to dockerize the project and run it on any platform supporting docker images (AWS ECS, Heroku, etc)

to dockerize the app run `docker build -t easy-gen-backend:latest .`

## Docs

you can see the full API docs by visiting `http://localhost:3000/api` locally or `https://deployment-domain/api` for deployed app
