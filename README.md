# Find a friend api

This is a Node.js API that provides an API for adopt a pet service. The application uses TypeScript, Docker, and PostgreSQL.

## Functional Requirements
- [x] Should be possible to create a pet
- [x] Should be possible to fetch all the pets avaliable to adopt in a city
- [x] Should be possible to filter pet by it's particularities
- [x] Should be possible to get details of a pet for adoption
- [x] Should be possible to register as an ORG 
- [x] Should be possible to login as an ORG

## Non-Functional Requirements
- [x] The data must be persisted in a Postgres database
- [x] The files must have to be stored in AWS S3
- [x] Password must be cryptographed
- [x] The user must be authenticated with JWT
- [x] The auth system have to use RBAC
- [x] The page size must be 10 items by default
- [x] The aplication must have unit tests
- [x] The aplication must have tests end to end
- [x] The aplication must throw custom errors
- [x] The aplication must have logs
- [x] The input data must be validated on controllers

## Business Rules
- [x] To fetch pets for adoption, it must inform city info
- [x] An ORG need to have a address and whatsapp phone number
- [x] A pet have to be linked with an ORG  Um pet deve estar ligado a uma ORG
- [x] The user how wants to adopt will contact the ORG via whatsapp
- [x] All filter, besides city, are optional
- [x] An ORG has to be ADMIN to access the aplication by login

## Prerequisites
- Docker and Docker Compose installed on your machine
- Node.js and npm/yarn/pnpm installed on your machine


## Setup Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:
```bash
# Application settings
NODE_ENV=dev
PORT=3000

# Database settings
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
DB_HOST=postgresql
DB_PORT=5432

# Cryptography
CRYPTO_SALT=your_crypto_salt

# JWT settings
JWT_SECRET=your_jwt_secret

# AWS settings
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET=your_aws_bucket
```

## Building and Running the Application
### To start the aplication in development mode with hot reloading
Install all dependencies:
```bash
npm i
```
To start the application:
```bash
npm run start:dev
```
To build the application:
```bash
npm run build
```
### Build the application with docker
Just run:
```bash
docker-compose up --build -d
```
## Docker Explanation
### This project is made to work isolated with docker container while uses optimized images to reduce storage size and increase security by having less vulnerabilities.
### The project has:
- A Dockerfile to create the api image by using alpine image, multi stage build and a cleaning on not needed files.
- A docker-compose.yml to orchestrate the services, a postgresql and the api itself, has a volume to persist database and network to maintain the aplication isolated from outside and using environment variables for sensitive info.
## Technologies Used
- Node.js;
- TypeScript;
- Fastify;
- Docker;
- Docker Compose;
- PostgreSQL;
- Vitest;
- Prisma;
- Zod.

## Additional Notes
- Make sure to replace placeholder values in the .env file with actual values.
- Ensure that Docker and Docker Compose are installed and running on your machine before starting the application.

## Author
Marcelo Alves
- <img src="https://user-images.githubusercontent.com/45273884/192056758-d7c1995b-4459-4acf-bb20-c4e19ee5daf3.svg" alt="twitter-logo" style="width: 20px; height: 20px;"> [@masamarux](https://twitter.com/masamarux)
- <img src="https://user-images.githubusercontent.com/45273884/192056770-fa5b48e0-a216-4f55-86fc-83cc6dd3590a.svg" alt="linkedin-logo" style="width: 20px; height: 20px;"> [Marcelo Alves](https://www.linkedin.com/in/marceloalves-/)
