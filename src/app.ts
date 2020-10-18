import { OpenAPIV3 } from 'openapi-types';
import { ConfigObject } from './config';
import { authenticationServiceFactory } from './domain/authentication/authentication.service';
import { statusOATag } from './domain/oa-tag/status.oa-tag';
// import { passwordHelperFactory } from './domain/password/password.helper';
import { jwtServiceFactory } from './domain/token/token-jwt.service';
import { userRepositoryFactory } from './domain/user/user.repository';
import { authenticatedStatusEndpointFactory } from './endpoints/status/authenticated-status.endpoint';
import { statusEndpointFactory } from './endpoints/status/status-endpoint';
import { Endpoint } from './framework/endpoint/endpoint';
import { fastifyServerFactory } from './framework/fastify/fastify-server.factory';
import { fastifySwaggerFactory } from './framework/fastify/fastify-swagger-factory';
import { Logger } from './logger';
import { authenticatedUseCaseFactory } from './use-cases/authenticated.use-case';
import { statusUseCaseFactory } from './use-cases/status_use-cases/status.use-case';
import { sequelizeConnection } from './framework/sequelize/connection';
import { userModelInit } from './domain/user/user.model';

export const start = async ({ config, logger }: { config: ConfigObject; logger: Logger }): Promise<void> => {
  const sequelize = sequelizeConnection(config.pg.connectionString);

  // init of the repos should happen before using the repos
  userModelInit({ sequelize });

  // const passwordHelper = passwordHelperFactory({ saltRounds: config.saltRounds });

  const userRepository = userRepositoryFactory();

  const tokenService = jwtServiceFactory({
    secret: config.jwt.secret,
    expiresIn: config.jwt.expiresIn,
    iss: config.jwt.issuer,
  });

  const authenticationService = authenticationServiceFactory({
    tokenService,
    userRepository,
  });

  const statusUseCase = statusUseCaseFactory();

  const statusEndpoint = statusEndpointFactory();

  const authenticatedStatusEndpoint = authenticatedStatusEndpointFactory({
    statusUseCase: authenticatedUseCaseFactory({
      authenticationService,
      useCase: statusUseCase,
    }),
  });

  const endpoints = [statusEndpoint, authenticatedStatusEndpoint];

  const securityRequirementObjects: OpenAPIV3.SecurityRequirementObject[] = [
    {
      bearerToken: [],
    },
  ];

  const components: OpenAPIV3.ComponentsObject = {
    schemas: {},
    securitySchemes: {
      bearerToken: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  };

  const tags = [statusOATag];

  const swaggerOptions = fastifySwaggerFactory({
    tags,
    components,
    security: securityRequirementObjects,
    host: config.domainSwagger,
  });

  const server = fastifyServerFactory({
    swaggerOptions,
    endpoints: endpoints as Endpoint[],
  });

  await server.listen(config.port);
  logger.info(`app listening on port ${config.port}`);
  await server.oas();
};
