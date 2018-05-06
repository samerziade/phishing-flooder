// @flow

type Url = string;

type Connect = {
  host: string,
  port: 80 | 443,
  path: string
};

type HttpMethod = 'GET' | 'POST' | 'PUT';

type HttpHeaders = {
  [header: string]: string
};

type Http = {
  method: HttpMethod,
  headers: HttpHeaders
};

type Schema = {
  name: string,
  type?: 'string',
  min?: number,
  max?: number,
  set?: string,
  value?: string
};

export type DataSchema = {
  connect: Connect,
  http: Http,
  schema: Array<Schema>
};
