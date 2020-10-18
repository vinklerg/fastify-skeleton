export type UseCase<Input, Output> = (input: Input) => Output;
export type AsyncUseCase<Input, Output> = UseCase<Input, Promise<Output>>;
