export type HttpMethod = 'GET' | 'POST' | 'PUT';

export interface Connect {
  hostname: string;
  port: number;
  path: string;
};

export interface HttpHeaders {
  [header: string]: string;
};

export interface Http {
  method: HttpMethod;
  headers: HttpHeaders;
};

export interface Schema {
  name: string;
  type?: string;
  min?: number;
  max?: number;
  set?: string;
  value?: string;
};

export interface DataSchema {
  connect: Connect;
  http: Http;
  schema: Array<Schema>;
};
