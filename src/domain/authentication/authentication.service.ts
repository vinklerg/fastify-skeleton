import { APIError } from '../../framework/errors/errors';
import { Identity } from '../identity/identity';
import { JWTService } from '../token/token-jwt.service';
import { UserRepository } from '../user/user.repository';
import { Unauthorized } from '../../framework/errors/authentication.errors';
import { ResourceNotFound } from '../../framework/errors/resource.errors';

export interface AuthenticationService {
  getIdentity(userID: string): Promise<Identity>;
  authenticate(token: string): Promise<Identity>;
}
export const authenticationServiceFactory = ({
  userRepository,
  tokenService,
}: {
  userRepository: UserRepository;
  tokenService: JWTService;
}): AuthenticationService => {
  const getIdentity = async (userID: string): Promise<Identity> => {
    const user = await userRepository.getUserByID(userID);
    if (!user) {
      throw new ResourceNotFound('user not found');
    }
    return {
      userID: user.id,
    };
  };
  const authenticate = async (token: string): Promise<Identity> => {
    try {
      const illegalIdentity = tokenService.verify(token);
      const identity = getIdentity(illegalIdentity.userID);
      return identity;
    } catch (error) {
      if (error instanceof APIError) {
        throw new Unauthorized('invalid identity');
      }
      throw error;
    }
  };

  return { getIdentity, authenticate };
};
