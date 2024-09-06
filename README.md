## Installation

```bash
$ npm install
```

## Docker Database Initiation

In the server workspace, create your .env file, which is a copy of .env.sample, but with your own environment values.

```bash
$ cd server
```

```bash
$ docker compose up -d
```

```bash
$ cd ..
```

```bash
# To reset Database to its original state with fixtures
$ npm run resetdb
```

## Running the App

```bash
# Starting the Backend Nest Web-API (port: 3000)
$ npm run start:server:dev
```

```bash
# Starting the Frontend React App (port: 5173)
$ npm run start:client:dev
```
