import * as bcrypt from 'bcrypt';

export interface PasswordHelper {
  match(plainPassword: string, hash: string): Promise<boolean>;
  hash(plainPassword: string): Promise<string>;
}
type FactoryArgs = {
  saltRounds: number;
};
export const passwordHelperFactory = (factoryArgs: FactoryArgs): PasswordHelper => {
  const match = (plainPassword: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hash);
  };
  const hash = (plainPassword: string): Promise<string> => {
    return bcrypt.hash(plainPassword, factoryArgs.saltRounds);
  };
  return { match, hash };
};
