import { createLogger, format, transports } from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, colorize, timestamp, printf, label, prettyPrint } = format;

// custom log format

const logFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const time = `${date.toDateString()} ${hour}:${minute}:${second}`;

  return `${time} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UM-INFO' }),
    timestamp(),
    colorize(),
    logFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        // eslint-disable-next-line no-undef
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'ums-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
});

const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UM-ERROR' }),
    timestamp(),
    colorize(),
    logFormat,
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        // eslint-disable-next-line no-undef
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'ums-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '10d',
    }),
  ],
});
export { logger, errorLogger };
