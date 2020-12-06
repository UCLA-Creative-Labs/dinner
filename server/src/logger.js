const { createLogger, format, transports } = require('winston');
const { combine, printf } = format;

const custom_format = printf( ({level, message, timestamp}) => {
  return `${timestamp} [${level}]: ${message}`;
});

module.exports = createLogger({
  format: combine(
    format.timestamp(),
    custom_format,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'log/server.log'}),
  ],
});