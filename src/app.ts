import send from './Client'
import { config } from './Config'
import { Log } from './Log'

const { count, interval } = config.application
let processCounter = 0
let errorCounter = 0

const timer = setInterval(async () => {
  processCounter++

  if (errorCounter >= 19) {
    Log.error(`${errorCounter} errors were encounted. Exiting.`)
    clearInterval(timer)
  } else if (count > 0 && count === processCounter) {
    clearInterval(timer)
  }

  try {
    await send(config)
    errorCounter = 0
  } catch (err) {
    errorCounter++
    Log.error(err)
  }
}, interval)
