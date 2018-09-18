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

export const validateEnvConfig = (): void => {
  const { env } = process

  if (!env.hasOwnProperty('APP_CONFIG_FILE') || !env.APP_CONFIG_FILE) {
    throw new Error('Please set the APP_CONFIG_FILE environment variable')
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

export const getConfigJson = (): Config => {
  const { env } = process
  return require(env.APP_CONFIG_FILE)
}

export const validateConfigSchema = (config: Config): string => {
  const validator = getZSchema()
  const schema = require('./schema.definition.json')

  return validator.validate(config, schema)
    ? ''
    : JSON.stringify(validator.getLastErrors())
}

export const getConfig = (): Config => {
  const config = getConfigJson()
  const validSchema = validateConfigSchema(config)

  validateEnvConfig()

  if (validSchema !== '') {
    throw new Error(validSchema)
  }

  return config
}

export const config = getConfig()
