# Phishing Flooder

> **NOTE:** This project is still being development

## Build Status

[![CircleCI](https://circleci.com/gh/samerziade/respammer/tree/master.svg?style=svg)](https://circleci.com/gh/samerziade/respammer/tree/master)

## Summary

A program used to flood phishing links with bogus data in order to try to protect the real information from actual victims.

It works by sending submitting fake data to phishing links, and so far we have completed the part to submit data. The next part of the project is to setup the ability to flood the submission using either docker or FaaS type of service.

## Config

Copy `site.example.json` to `site.json` and update configuration accordingly. The application is setup to read from that file, and Git will ignore it.

## Run

```bash
npm start
```
