import { DataTypes, ModelAttributes, Sequelize } from 'sequelize';
import { ResourceModel, baseModelAttributes } from '../../framework/sequelize/resource';

const userAttributes: ModelAttributes = {
  ...baseModelAttributes,
  name: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.TEXT,
  },
};

export class UserModel extends ResourceModel {
  public name!: string;
  public email!: string;
}

export const userModelInit = ({ sequelize }: { sequelize: Sequelize }): void =>
  UserModel.init(userAttributes, { sequelize, tableName: 'users', timestamps: true });
