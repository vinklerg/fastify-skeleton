import { start } from './app';
import { config } from './config';
import { createLogger } from './logger';

const thrower = (err: unknown): void => {
  throw err;
};

const throwToGlobal = (err: unknown): NodeJS.Immediate => setImmediate(() => thrower(err));

const startApp = async (): Promise<void> => {
  const logger = createLogger({
    name: 'fastify-backend',
    version: '1.0.0',
    level: config.logger.level,
  });

  await start({ logger, config });
};

startApp().catch(throwToGlobal);
