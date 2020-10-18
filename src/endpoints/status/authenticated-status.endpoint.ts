import { baseOAErrorResponses } from '../../domain/+oa_components/responses.oa-component';
import { statusOATag } from '../../domain/oa-tag/status.oa-tag';
import { Endpoint, EndpointMethod } from '../../framework/endpoint/endpoint';
import { getTokenFromHeader } from '../../framework/http/get-token';
import { AuthenticatedUseCase } from '../../use-cases/authenticated.use-case';
import { StatusUseCase } from '../../use-cases/status_use-cases/status.use-case';

type Response = {
  status: string;
};
type AuthenticatedStatusEndpointFactoryArgs = {
  statusUseCase: AuthenticatedUseCase<StatusUseCase>;
};
export const authenticatedStatusEndpointFactory = (
  factoryArgs: AuthenticatedStatusEndpointFactoryArgs,
): Endpoint<{}, {}, {}, {}, Response> => ({
  method: EndpointMethod.GET,
  route: '/status/authenticated',
  schema: {
    summary: 'This endpoint is responsible for returning the status of the API',
    description: 'This endpoint can only return status: ok or internal server error and also authenticated',
    tags: [statusOATag.name],
    response: {
      200: {
        type: 'object',
        description: 'API status is ok!',
        required: ['status'],
        additionalProperties: false,
        properties: {
          status: { type: 'string' },
        },
      },
      500: baseOAErrorResponses[500],
    },
  },
  handler: async (request) => {
    const token = getTokenFromHeader(request.headers);
    const output = await factoryArgs.statusUseCase({ token });
    return {
      status: 200,
      response: {
        status: output.status,
      },
    };
  },
});
