// @flow

type Connect = {
  hostname: string,
  port: number,
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
