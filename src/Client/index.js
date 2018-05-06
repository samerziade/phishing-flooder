// @flow

import https from 'https';
import http from 'http';
import randomUserAgent from 'random-useragent';

import type { ClientRequest as HttpsClientRequest } from 'https';
import type { ClientRequest as HttpClientRequest } from 'http';
import type { DataSchema } from '../../schemas/schema.flow';

type Request = HttpsClientRequest | HttpClientRequest;

const createRequest = (config: DataSchema): Request => {
  const options = {
    ...config.connect,
    method: config.http.method
  };

  return config.connect.port === 443
    ? https.request(options)
    : http.request(options);
};

const setupHeaders = (request: Request, config: DataSchema) => {
  const { headers } = config.http;

  for (const key in headers) {
    request.setHeader(key, headers[key]);
  }

  request.setHeader('Host', config.connect.hostname);

  if (!headers['User-Agent']) {
    request.setHeader('User-Agent', randomUserAgent.getRandom());
  }
};

export default (config: DataSchema) => {
  const request = createRequest(config);
  setupHeaders(request, config);

  request.on('response', (res, socket, head) => {
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
