# Phishing Flooder [![CircleCI](https://circleci.com/gh/samerziade/phishing-flooder/tree/master.svg?style=svg)](https://circleci.com/gh/samerziade/phishing-flooder/tree/master)

> **NOTE:** This project is still being development

## Summary

A program used to flood phishing links with bogus data in order to try to protect the real information from actual victims.

It works by sending submitting fake data to phishing links, and so far we have completed the part to submit data. The next part of the project is to setup the ability to flood the submission using either docker or FaaS type of service.

## Config

Copy `config.example.json` to `src/app.config.json` and update configuration accordingly. The application is setup to read from that file, and Git will ignore it.

Please refer to [config.ts](src/config.ts) for the type definitions of the configuration file, and [config.example.json](config.example.json) to see a list of all possible options.

### Application Config

| Key        | Type     | Description                                           |
|------------|----------|-------------------------------------------------------|
| `runCount` | `number` | Number of requests to send. Set to `0` to run forever |
| `interval` | `number` | The time to wait between requests                     |

## Run

```shell
npm start
```

### Sample Server

If you'd like to run this against a test server, you can use the provided [docker-compose.yml](docker/test) file. The provided [config.example.json](config.example.json) file is configured to run using that server.

```shell
cd docker/test
docker-compose up
```

## Test

Test coverage is still not 100%, but will be be working on adding more as time permits.

```shell
npm run test
```