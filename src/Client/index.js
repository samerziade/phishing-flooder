import * as https from 'https'
import * as http from 'http'
import * as agents from './agents'
import * as fields from './field'
import * as querystring from 'querystring'

const log = require('loglevel')
let requestCounter = 0

const createRequest = ({ connect, http: { method } }) =>
  connect.port === 443
    ? https.request({ ...connect, method })
    : http.request({ ...connect, method })

const setupHeaders = (request, config) => {
  const { headers } = config.http

  for (const key in headers) {
    request.setHeader(key, headers[key])
  }

  request.setHeader('Host', config.connect.hostname)

  if (!headers['User-Agent']) {
    request.setHeader('User-Agent', agents.getRandom())
  }
}

const setupRequestData = (request, config) => {
  const reducer = (acc, curr) => ({
    ...acc,
    ...fields.getValue(curr),
  })

  const data = querystring.stringify(config.schema.reduce(reducer, {}))
  const { method } = config.http

  if (data.trim() !== '' && (method === 'POST' || method === 'PUT')) {
    request.setHeader('Content-Length', Buffer.byteLength(data).toString())
    request.setHeader('Content-Type', 'application/x-www-form-urlencoded')

    return data.trim()
  }

  return ''
}

const printHeaders = headers => {
  const keys = Object.keys(headers)
  const { length } = keys.reduce((a, b) => (a.length > b.length ? a : b))

  keys.map(header => {
    log.debug(header.padEnd(length, ' ') + '\t' + headers[header])
  })
}

export default config =>
  new Promise((resolve, reject) => {
    requestCounter++

    const request = createRequest(config)
    setupHeaders(request, config)

    const requestData = setupRequestData(request, config)

    if (requestData !== '') {
      request.write(requestData)
    }

    request.on('response', res => {
      let responseData = ''
      res.on('data', chunk => (responseData += chunk))
      res.on('error', err => reject(`RESPONSE - ${err.name} - ${err.message}`))

      res.on('end', () => {
        if (requestData !== '') {
          log.info(`[${requestCounter}]: ${requestData}`)
          printHeaders(request.getHeaders())
          log.debug(responseData)
        }

        resolve()
      })
    })

    request.on('error', err => reject(`REQUEST - ${err.name} - ${err.message}`))
    request.end()
  })
