import { OpenAPIV3 } from 'openapi-types';

export enum EndpointMethod {
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export type EndpointRoute = string;
export type EndpointTag = { name: string; tag: string };
export type EndpointHandlerInput<
  Headers extends object = {},
  Query extends object = {},
  Params extends object = {},
  Body extends object = {}
> = {
  headers: Headers;
  query: Query;
  params: Params;
  body: Body;
};
export type EndpointSchema = {
  summary?: string;
  description?: string;
  tags?: string[];
  headers?: OpenAPIV3.NonArraySchemaObject;
  query?: OpenAPIV3.NonArraySchemaObject;
  params?: OpenAPIV3.NonArraySchemaObject;
  body?: OpenAPIV3.NonArraySchemaObject;
  response?: { [key: string]: OpenAPIV3.NonArraySchemaObject };
};
export type EndpointHandlerResponse<Response> = {
  status: number;
  response: Response;
};
export type Endpoint<
  Headers extends object = {},
  Query extends object = {},
  Params extends object = {},
  Body extends object = {},
  Response extends object = {}
> = {
  method: EndpointMethod;
  route: EndpointRoute;
  schema: EndpointSchema;
  handler: (input: EndpointHandlerInput<Headers, Query, Params, Body>) => Promise<EndpointHandlerResponse<Response>>;
};
