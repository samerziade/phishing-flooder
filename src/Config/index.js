import ZSchema from 'z-schema'

export const validateEnvConfig = () => {
  const { env } = process

  if (!env.hasOwnProperty('APP_CONFIG_FILE') || !env.APP_CONFIG_FILE) {
    throw new Error('Please set the APP_CONFIG_FILE environment variable')
  }
}

const getZSchema = () => {
  const options = {
    noEmptyArrays: true,
    noEmptyStrings: true,
    noTypeless: true,
    noExtraKeywords: true,
  }

  return new ZSchema(options)
}

export const getConfigJson = () => {
  const { env } = process
  return require(env.APP_CONFIG_FILE)
}

export const validateConfigSchema = config => {
  const validator = getZSchema()
  const schema = require('./schema.definition.json')

  return validator.validate(config, schema)
    ? ''
    : JSON.stringify(validator.getLastErrors())
}

export const getConfig = () => {
  const config = getConfigJson()
  const validSchema = validateConfigSchema(config)

  validateEnvConfig()

  if (validSchema !== '') {
    throw new Error(validSchema)
  }

  return config
}

export const config = getConfig()
