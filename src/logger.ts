import pino from 'pino';

type LoggerFn = {
  (msg: string, ...args: unknown[]): void;
  (obj: object, msg?: string, ...args: unknown[]): void;
};
export interface Logger {
  info: LoggerFn;
  debug: LoggerFn;
  error: LoggerFn;
  warn: LoggerFn;
}
export const createLogger = ({ level, name, version }: { level: string; name: string; version: string }): Logger =>
  pino({
    name,
    level,
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
    messageKey: 'message',
  }).child({ version });
