<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Decamoond

This project implements a simple authentication service using NestJS,Fastify, MongoDB, and Docker .

## Core Task: OTP Authentication

The main goal is to build a simple authentication service with the following flow:

1.  **OTP Request**: A user provides a mobile number to request a One-Time Password (OTP).
2.  **OTP Generation**: The system generates a random OTP. For this implementation, the OTP will be logged to the console instead of being sent via SMS.
3.  **OTP Verification**: The user submits the received OTP.
    -   If the OTP is correct and the user is new, a new user record is created in the database.
    -   If the OTP is correct and the user already exists, the system proceeds to log them in.
4.  **Token Issuance**: Upon successful verification, a JSON Web Token (JWT) is generated and returned to the user for authenticating subsequent requests.

## Features

- **NestJS Framework**: Progressive Node.js framework for building efficient server-side applications
- **Fastify**: High-performance web server instead of Express
- **MongoDB**: NoSQL database with Mongoose ODM
- **Docker**: Containerized application with Docker Compose
- **TypeScript**: Full TypeScript support
- **i18n**: Internationalization support for multiple languages

## Prerequisites
 
- Docker and Docker Compose
- MongoDB (if running locally without Docker)
- Node.js 22+ (if running locally without Docker)



## Getting Started

You can run this project using Docker (recommended) or locally.

### With Docker (Recommended)

When using Docker, you do not need to install dependencies like Node.js or MongoDB on your host machine.

1.  **Set up environment variables:**
    ```bash
    $ cp .env.example .env
    ```
    The default values in `.env` are configured for the Docker setup.

2.  **Run the application:**
    ```bash
    # Start the application and MongoDB with Docker Compose
    $ npm run docker:dev
    ```

### For Local Development (Without Docker)

1.  **Install dependencies:**
    ```bash
    $ npm install
    ```

2.  **Set up environment variables:**
    ```bash
    $ cp .env.example .env
    ```
    Update the `.env` file to point to your local MongoDB instance.

3.  **Run the application:**
    ```bash
    # watch mode
    $ npm run start:dev
    ```



## Debugging in Docker: 0.0.0.0:9229 Explained

When debugging a Node.js application inside a Docker container, you may see commands like:

```bash
nest start --debug 0.0.0.0:9229 --watch
```

- **0.0.0.0** means "listen on all network interfaces". This allows debug connections from any network interface, including from outside the container. Without it (if using the default 127.0.0.1), the debugger would only accept connections from within the container itself.
- **9229** is the standard Node.js debugging port. This is the port your IDE's debugger connects to.

**What happens if you remove it?**

If you change the script to just `nest start --debug --watch` (removing the address):

- The debugger would likely listen only on 127.0.0.1:9229 (localhost).
- This would make it inaccessible from outside the container.
- Even with port forwarding configured, you couldn't connect from your host machine.

**Summary:** Using `0.0.0.0:9229` makes remote debugging possible from outside the container. Without it, remote debugging will not work.


## Docker Commands

```bash
# Build Docker image
$ npm run docker:build

# Run Docker container
$ npm run docker:run

# Start with Docker Compose
$ npm run docker:up

# Stop Docker Compose
$ npm run docker:down

# View logs
$ npm run docker:logs
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Shahriar Enayaty](https://losiana.com/g/shahriarenayati)
- Github - [https://nestjs.com](https://github.com/shahriarenayaty)
- Stackoverflow  - [@nestframework](https://stackoverflow.com/users/9349234/shahriar-enayaty)

## License

Nest is [MIT licensed](LICENSE).
