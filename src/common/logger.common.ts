import path from 'path';
import winston from 'winston';

const errorFilePath = path.join(path.resolve(), 'logs');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      level: 'fatal',
      filename: 'error.log',
      dirname: errorFilePath,
    }),
    new winston.transports.Console({
      format: winston.format.json(),
      level: 'error',
    }),
  ],
});

export default logger;
