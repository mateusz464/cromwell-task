# Cromwell Demo Website and API

This is a demo website and API for Cromwell created with Node.js and Express for the backend and React with Redux for the frontend.

## Table of Contents

- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up the Environment Variables](#setting-up-the-environment-variables)
  - [Running the API in Development/Preview Mode](#running-the-api-in-developmentpreview-mode)
  - [Running the Website in Development/Preview Mode](#running-the-website-in-developmentpreview-mode)
  - [Running the API in Production Mode](#running-the-api-in-production-mode)
  - [Running the Website in Production Mode](#running-the-website-in-production-mode)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)

## Installation

### Prerequisites

Before installing the project, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) v17.0.0 or later
- [npm](https://www.npmjs.com/) v6.14.4 or later

### Installing Dependencies

Once you have the prerequisites installed, you can install the project's dependencies by running the following command in the root directory:

```
npm install
```

### Setting Up the Environment Variables

The API requires the following environment variables to be set:

- `NODE_ENV`: The environment in which the application is running. Set to `development` for development and `production` for production.
- `MONGO_URI`: The URI of the MongoDB database.
- `COOKIE_SECRET`: The secret used to sign the session cookie.
- `JWT_SECRET`: The secret used to sign the JWT token.

You can set these environment variables either by creating a `.env` file in the **backend folder** and setting the variables there, or by setting them directly in your operating system's environment variables.

### Running the API in Development/Preview Mode

Once you have the dependencies and environment variables set up, you can build the API by running the following command:

Go to the backend folder:
```
cd backend
```

Run the following command:
```
npm start
```

The API should now be running on `http://localhost:3001`.

### Running the Website in Development/Preview Mode

To run the website locally, you can run the following command in the root directory:

Go to the frontend folder:
```
cd frontend
```

Run the following command:
```
npm run dev
```

The website should now be running on `http://localhost:5173`.

### Running the API in Production Mode

To run the API in production mode, you can run the following command in the backend folder:

```
npm run build
```

This will build the API and output the files to the `dist` folder. You can then run the API using the following command:
```
node dist/index.js
```

### Running the Website in Production Mode

To run the website in production mode, you can run the following command in the frontend folder:

```
npm run build
```

This will build the website and output the files to the `dist` folder. You can then run the website using a static file server like [serve](https://www.npmjs.com/package/serve) or [http-server](https://www.npmjs.com/package/http-server).

## API Documentation

The API has the following endpoints:

### GET /api/user
Returns the name and email of the currently logged-in user.

**Parameters:** None

**Body:** None

**Headers:**
- `Authorization`: Bearer Token (Required)

**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "email": "string"
}
```

### POST /api/user/login
Logs in the user with the given email and password.

**Parameters:** None

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Headers:** None

**Response:**
```json
{
  "token": "string"
}
```

### POST /api/user/register
Registers a new user with the given name, email, and password.

**Parameters:** None

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Headers:** None

**Response:**
```json
{
  "token": "string"
}
```

## Authentication

To obtain a Bearer token, the user needs to log in first.

To log in, the user needs to head to the /user/login page and then enter the correct credentials. If successful, a token will be returned.

The user the needs to pass the Bearer token as a header.