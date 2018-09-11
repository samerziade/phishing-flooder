import send from './Client'
import { config } from './config'

const { count, interval } = config.application
let counter = 0

const timer = setInterval(async () => {
  counter++

  send(config)
    .then(data => console.info(data))
    .catch(err => console.error(err))

  if (count > 0 && count === counter) {
    clearInterval(timer)
  }
}, interval)
