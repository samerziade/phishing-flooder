import * as ZSchema from 'z-schema'

export type HttpMethod = 'GET' | 'POST' | 'PUT'

export enum LogLevel {
  OFF,
  DEBUG,
  INFO,
  ERROR,
  CRITICAL,
}

export interface Application {
  count: number
  interval: number
  log: LogLevel
}

export interface Connect {
  hostname: string
  port: number
  path: string
}

export interface HttpHeaders {
  [header: string]: string
}

export interface Http {
  method: HttpMethod
  headers: HttpHeaders
}

export interface Schema {
  name: string
  type?: string
  min?: number
  max?: number
  set?: string
  value?: string
}

export interface Config {
  application: Application
  connect: Connect
  http: Http
  schema: Array<Schema>
}

const validateEnvConfig = (): void => {
  const { env } = process

  if (!env.hasOwnProperty('APP_CONFIG_FILE') || !env.APP_CONFIG_FILE) {
    console.error('Please set the APP_CONFIG_FILE environment variable')
    process.exit(1)
  }
}

const getZSchema = (): ZSchema => {
  const options: ZSchema.Options = {
    noEmptyArrays: true,
    noEmptyStrings: true,
    noTypeless: true,
    noExtraKeywords: true,
  }

  return new ZSchema(options)
}

const getConfig = (): Config => {
  const { env } = process
  const validator = getZSchema()
  const schema = require('./schema.definition.json')
  const config: Config = require(env.APP_CONFIG_FILE)

  if (!validator.validate(config, schema)) {
    console.error(validator.getLastErrors())
    process.exit(1)
  }

  return config
}

validateEnvConfig()
export const config = getConfig()
