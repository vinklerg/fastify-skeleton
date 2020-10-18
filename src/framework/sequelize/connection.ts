import { Sequelize } from 'sequelize';
export const sequelizeConnection = (connectionString: string): Sequelize => new Sequelize(connectionString);
