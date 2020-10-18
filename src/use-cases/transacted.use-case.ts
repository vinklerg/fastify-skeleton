import { Sequelize } from 'sequelize';
import { AsyncUseCase } from '../framework/use-case/async.use-case';

export const transactedUseCaseFactory = <TInput, TOutput>({
  useCase,
  sequelize,
}: {
  useCase: AsyncUseCase<TInput, TOutput>;
  sequelize: Sequelize;
}): AsyncUseCase<TInput, TOutput> => async (input: TInput): ReturnType<typeof useCase> => {
  const transaction = await sequelize.transaction();
  try {
    const output = await useCase(input);
    await transaction.commit();
    return output;
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};
