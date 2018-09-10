import send from './src/Client'
import { DataSchema } from './src/schema.types'

const config: DataSchema = require('./site.json')
send(config)
