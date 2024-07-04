# Find a friend api

This is a Node.js API that provides an API for adopt a pet service. The application uses TypeScript, Docker, and PostgreSQL.

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
