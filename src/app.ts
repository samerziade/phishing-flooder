import send from './Client'
import { config } from './config'
import { Log } from './Log'

const { count, interval } = config.application
let counter = 0

const timer = setInterval(async () => {
  counter++

  send(config)
    .then(data => Log.info(data))
    .catch(err => Log.error(err))

  if (count > 0 && count === counter) {
    clearInterval(timer)
  }
}, interval)
