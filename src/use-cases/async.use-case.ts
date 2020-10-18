export interface AsyncUseCase<Input, Output> {
  handle(args: Input): Promise<Output>;
}
