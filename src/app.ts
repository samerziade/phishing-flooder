import send from './Client'
import { config } from './config'

const { runCount, interval } = config.application
let count = 0

const timer = setInterval(async () => {
  count++

  send(config)
    .then(data => console.info(data))
    .catch(err => console.error(err))

  if (runCount > 0 && count === runCount) {
    clearInterval(timer)
  }
}, interval)
