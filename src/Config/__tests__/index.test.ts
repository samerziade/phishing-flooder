let Config
const ORIGINAL_CONFIG_FILE = process.env.APP_CONFIG_FILE

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
  Config.getConfigJson = () => {
    const json = require(process.env.APP_CONFIG_FILE)
    json.application.count = 'fail'

    return json
  }

  expect(() => {
    Config.getConfig()
  }).toThrow(Error)
})
