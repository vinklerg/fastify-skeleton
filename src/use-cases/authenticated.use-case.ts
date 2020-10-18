import { AuthenticationService } from '../domain/authentication/authentication.service';
import { WithoutIdentity } from '../domain/identity/identity';
import { AsyncUseCase } from '../framework/use-case/async.use-case';

type WithToken<T> = T & { token: string };

export type AuthenticatedUseCase<
  WrappableUseCase extends (input: Parameters<WrappableUseCase>[0]) => ReturnType<WrappableUseCase>
> = (input: WithToken<WithoutIdentity<Parameters<WrappableUseCase>[0]>>) => ReturnType<WrappableUseCase>;
export const authenticatedUseCaseFactory = <Input, Output>({
  useCase,
  authenticationService,
}: {
  useCase: AsyncUseCase<Input, Output>;
  authenticationService: AuthenticationService;
}): AsyncUseCase<WithToken<WithoutIdentity<Input>>, Output> => async (
  input: WithToken<WithoutIdentity<Input>>,
): ReturnType<typeof useCase> => {
  const { token, ...inputWithoutToken } = input;
  const identity = await authenticationService.authenticate(token);
  const output = await useCase(({ ...inputWithoutToken, identity } as unknown) as Input);
  return output;
};
