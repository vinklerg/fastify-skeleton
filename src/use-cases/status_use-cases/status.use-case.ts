import { AsyncUseCase } from '../../framework/use-case/async.use-case';

type Input = {};
type Output = {
  status: string;
};
export type StatusUseCase = AsyncUseCase<Input, Output>;
export const statusUseCaseFactory = (): StatusUseCase => async (): Promise<Output> =>
  Promise.resolve({
    status: 'ok',
  });
