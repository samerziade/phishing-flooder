import send from './Client'
import { config } from './Config'
import { Log } from './Log'

const { count, interval } = config.application
let counter = 0

const timer = setInterval(() => {
  send(config).catch(err => Log.error(err))

  if (count > 0 && count === ++counter) {
    clearInterval(timer)
  }
}, interval)
