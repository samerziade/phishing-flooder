import * as path from 'path'

let Config

const ORIGINAL_CONFIG_FILE = (() => {
  const APP_ROOT = path.resolve(__dirname).replace('/src/Config/__tests__', '')

  return process.env.APP_CONFIG_FILE
    ? process.env.APP_CONFIG_FILE
    : `${APP_ROOT}/src/app.config.json`
})()

beforeEach(() => {
  process.env.APP_CONFIG_FILE = ORIGINAL_CONFIG_FILE
  Config = require('..')
})

test('validateEnvConfig() SHOULD NOT throw an Error if an environment variable is set', () => {
  expect(Config.validateEnvConfig()).toBeUndefined()
})

test('validateEnvConfig() SHOULD throw an Error if no environment variable is set', () => {
  delete process.env.APP_CONFIG_FILE

  expect(() => {
    Config.validateEnvConfig()
  }).toThrow(Error)
})

test('getConfig() SHOULD NOT throw an exception when fetching the configuration', () => {
  const json = Config.getConfigJson()
  expect(Config.getConfig()).toEqual(json)
})

test('getConfig() SHOULD throw an exception when validating the configuration', () => {
  const config = require(process.env.APP_CONFIG_FILE)
  config.application.count = 'fail'

  const result = Config.validateConfigSchema(config)

  expect(result).not.toEqual('')
})
