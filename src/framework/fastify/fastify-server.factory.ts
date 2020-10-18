import fastify, { RouteOptions, FastifyInstance } from 'fastify';
import oas, { FastifyOASOptions } from 'fastify-oas';
import fastifyCors from 'fastify-cors';
import http from 'http';
import { Endpoint } from '../endpoint/endpoint';
import { APIError } from '../errors/errors';

type FastifyFactoryArgs = {
  endpoints: Endpoint[];
  swaggerOptions: FastifyOASOptions;
};
export const fastifyServerFactory = (factoryArgs: FastifyFactoryArgs): FastifyInstance => {
  const fastifyServer = fastify<http.Server>({
    logger: false,
  });

  fastifyServer.register(fastifyCors, {
    origin: '*',
  });

  fastifyServer.register(oas, factoryArgs.swaggerOptions);

  const errorMapper = (err: unknown): { status: number; response: object } => {
    if (err instanceof APIError) {
      return {
        status: err.status,
        response: {
          detail: err.detail,
        },
      };
    }
    return {
      status: 500,
      response: { detail: err },
    };
  };

  const wrappedFastifyHandler = (endpointHandler: Endpoint['handler']) => async (
    request: fastify.FastifyRequest,
    reply: fastify.FastifyReply<http.ServerResponse>,
  ) => {
    try {
      const endpointArgs = {
        headers: request.headers,
        query: request.query,
        params: request.params,
        body: request.body,
      };
      const endpointResult = await endpointHandler(endpointArgs);
      return reply.status(endpointResult.status).send({ ...endpointResult.response });
    } catch (err) {
      const errorResponse = errorMapper(err);
      return reply.status(errorResponse.status).send({ ...errorResponse.response });
    }
  };

  factoryArgs.endpoints.forEach((endpoint) => {
    const fastifyRouteOptions: RouteOptions = {
      method: endpoint.method,
      url: endpoint.route,
      schema: endpoint.schema,
      handler: wrappedFastifyHandler(endpoint.handler),
    };
    fastifyServer.route(fastifyRouteOptions);
  });

  return fastifyServer;
};
