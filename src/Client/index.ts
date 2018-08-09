import * as https from 'https';
import * as http from 'http';
import * as agents from './agents';
import * as fields from './field';
import * as querystring from 'querystring';
import { DataSchema, Schema } from '../schema.types';

type Request = http.ClientRequest;

const createRequest = (config: DataSchema): Request => {
  const options = {
    ...config.connect,
    method: config.http.method
  };

  return config.connect.port === 443
    ? https.request(options)
    : http.request(options);
};

const setupHeaders = (request: Request, config: DataSchema): void => {
  const { headers } = config.http;

  for (const key in headers) {
    request.setHeader(key, headers[key]);
  }

  request.setHeader('Host', config.connect.hostname);

  if (!headers['User-Agent']) {
    request.setHeader('User-Agent', agents.getRandom());
  }
};

const setupRequestData = (request: Request, config: DataSchema): void => {
  const reducer = (acc: Schema, curr: Schema) => ({
    ...acc,
    ...fields.getValue(curr)
  });

  const data = querystring.stringify(config.schema.reduce(reducer, {}));

  if (data.trim() !== '') {
    request.setHeader('Content-Length', Buffer.byteLength(data).toString());

    if (config.http.method === 'POST' || config.http.method === 'PUT') {
      request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    request.write(data);
  }
};

export default (config: DataSchema): void => {
  const request = createRequest(config);
  setupHeaders(request, config);
  setupRequestData(request, config);

  request.on('response', (res: http.IncomingMessage) => {
    const { headers, statusCode } = res;
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(data);
    });
  });

  request.end();
};
