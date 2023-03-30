const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} : [${level.toUpperCase().padEnd(7)}] - ${message}`)
  ),
  transports: [
    new winston.transports.Console({ level: 'silly', }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),
  ],
});

module.exports = logger;
