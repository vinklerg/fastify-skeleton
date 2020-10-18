import { Resource } from '../../framework/sequelize/resource';

export type User = Resource & {
  name: string;
  email: string;
};
