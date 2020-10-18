import convict from 'convict';
import * as dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export type ConfigObject = {
  domain: string;
  domainSwagger: string;
  port: number;
  logger: {
    level: string;
  };
  saltRounds: number;
  jwt: {
    secret: string;
    expiresIn: string;
    issuer: string;
  };
  pg: {
    connectionString: string;
  };
};

const convictConfig = convict<ConfigObject>({
  domain: {
    doc: 'Domain name.',
    format: String,
    default: 'http://localhost:3000',
    env: 'APP_DOMAIN',
  },
  domainSwagger: {
    doc: 'Domain name for swagger.',
    format: String,
    default: 'localhost:3000',
    env: 'APP_DOMAIN_SWAGGER',
  },
  port: {
    doc: 'The port to bind.',
    format: Number,
    default: 3000,
    env: 'PORT',
  },
  logger: {
    level: {
      doc: 'Defines the level of the logger.',
      format: String,
      default: 'debug',
      env: 'LOGGER_LEVEL',
    },
  },
  saltRounds: {
    doc: 'Salt rounds in number.',
    format: Number,
    default: 10,
    env: 'SALT_ROUNDS',
  },
  jwt: {
    secret: {
      doc: 'jwt secret key',
      format: String,
      default: 'secret',
      env: 'JWT_SECRET',
    },
    expiresIn: {
      doc: 'Token expiration time.',
      format: String,
      default: '24h',
      env: 'JWT_EXPIRATION_TIME',
    },
    issuer: {
      doc: 'JWT token issuer.',
      format: String,
      default: 'nordvik',
      env: 'JWT_ISSUER',
    },
  },
  pg: {
    connectionString: {
      doc: 'Connection string for postgres.',
      format: String,
      default: 'postgresql://user:password@localhost:5432/db',
      env: 'PG_CONNECTION_STRING',
    },
  },
});

convictConfig.validate({ allowed: 'strict' });

export const config = convictConfig.getProperties();

export const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
