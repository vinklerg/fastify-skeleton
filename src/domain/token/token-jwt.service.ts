import * as jsonWebToken from 'jsonwebtoken';
import { Identity } from '../identity/identity';
import { TokenService } from './token.service';
import { Unauthorized } from '../../framework/errors/authentication.errors';

export type WithJWTBase<TokenType> = TokenType & { iss?: string; exp: number; iat: number };
export type JWTService = TokenService<string, Identity>;

type JWTServiceFactoryArgs = {
  secret: string;
  expiresIn: string;
  iss: string;
};

export const jwtServiceFactory = (factoryArgs: JWTServiceFactoryArgs): JWTService => {
  const sign = (payload: Identity): string => {
    return jsonWebToken.sign(payload, factoryArgs.secret, {
      expiresIn: factoryArgs.expiresIn,
      issuer: factoryArgs.iss,
    });
  };

  const verify = (token: string): WithJWTBase<Identity> => {
    try {
      return jsonWebToken.verify(token, factoryArgs.secret) as WithJWTBase<Identity>;
    } catch (err) {
      throw new Unauthorized('user token not verified');
    }
  };

  return {
    sign,
    verify,
  };
};
