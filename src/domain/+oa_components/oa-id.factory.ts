import { OpenAPIV3 } from 'openapi-types';
import { isArray } from 'util';

export const oaIDFactory = (ids: string | string[]): OpenAPIV3.NonArraySchemaObject => {
  if (isArray(ids)) {
    const returnObject = {
      type: 'object',
      required: [...ids],
      additionalProperties: false,
      properties: {},
    };
    ids.forEach((property) => {
      returnObject.properties = {
        ...returnObject.properties,
        [property]: { type: 'string' },
      };
    });
    return returnObject as OpenAPIV3.NonArraySchemaObject;
  }
  return {
    type: 'object',
    required: [ids],
    additionalProperties: false,
    properties: {
      [ids]: { type: 'string' },
    },
  };
};
