import { DataSchema } from './schema';

const schema: DataSchema = {
  connect: {
    hostname: 'samer.io',
    port: 443,
    path: '/'
  },

  http: {
    method: 'GET',

    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en',
      'Cache-Control': 'no-cache',
      Connection: 'close',
      DNT: '1',
      Pragma: 'no-cache'
    }
  },

  schema: [
    {
      name: 'access_number',
      type: 'string',
      min: 16,
      max: 16,
      set: '0123456789'
    },
    {
      name: 'textfield2'
    },
    {
      name: 'password',
      type: 'string',
      min: 8,
      max: 64,
      set:
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~!@#$%^&*()_+[{]}|;:",<.>?'
    },
    {
      name: 'button',
      value: 'Login'
    },
    {
      name: 'login_submitted',
      value: '1'
    }
  ]
};

export default schema;
