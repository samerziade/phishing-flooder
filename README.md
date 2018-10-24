# Phishing Flooder [![CircleCI](https://circleci.com/gh/samerziade/phishing-flooder/tree/master.svg?style=svg)](https://circleci.com/gh/samerziade/phishing-flooder/tree/master)

## Summary

A program used to flood phishing links with bogus data in order to try to protect the real information from actual victims.

## Docker

* [Image](https://hub.docker.com/r/samerziadeh/phishing-flooder/)
* [Dockerfile](docker/app/Dockerfile)

## Running Locally

### Config

Copy `config.example.json` to `src/app.config.json` and update the configuration accordingly. The application is setup to read from that file, and Git will ignore it.

Please refer to [config.ts](src/config.ts) for the type definitions of the configuration file, and [config.example.json](config.example.json) to see a list of all possible options.

#### Application Config

| Key        | Type     | Description                                           |
|------------|----------|-------------------------------------------------------|
| `count`    | `number` | Number of requests to send. Set to `0` to run forever |
| `interval` | `number` | The time to wait between requests                     |
| `log`      | `number` | Numbers outlined in the next section                  |

#### Log Levels

| Value | Level |
|-------|-------|
| 0     | OFF   |
| 1     | DEBUG |
| 2     | INFO  |
| 3     | ERROR |

#### Test Web Server

You can use the provided [docker-compose.yml](docker/test) file. The provided [config.example.json](config.example.json) file is configured to run using that server.

```shell
cd docker/test
docker-compose up
```

### Run

```shell
npm start
```

## Test

Test coverage is still not 100%, but will be be working on adding more as time permits.

```shell
npm run test
```
