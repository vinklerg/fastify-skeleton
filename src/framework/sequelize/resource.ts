import { Model, ModelAttributes, DataTypes } from 'sequelize';

export type Resource = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
export class ResourceModel extends Model {
  id!: string;
  createdAt!: Date;
  updatedAt: Date;
}

export const baseModelAttributes: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
};
