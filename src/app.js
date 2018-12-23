import send from './Client'
import { config } from './Config'

const log = require('loglevel')
const { count, interval, logLevel } = config.application
let processCounter = 0
let errorCounter = 0

log.setLevel(logLevel)

const timer = setInterval(async () => {
  processCounter++

  if (errorCounter >= 19) {
    log.error(`${errorCounter} errors were encounted. Exiting.`)
    clearInterval(timer)
  } else if (count > 0 && count === processCounter) {
    clearInterval(timer)
  }

  try {
    await send(config)
    errorCounter = 0
  } catch (err) {
    errorCounter++
    log.error(err)
  }
}, interval)
