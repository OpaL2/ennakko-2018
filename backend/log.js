'use strict';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.Console({
      name: 'console'
    }),
    new DailyRotateFile({
      name: 'file',
      filename: 'log/re.log'
    }),
    new DailyRotateFile({
      name: 'file-error',
      filename: 'log/re-error.log',
      level: 'error',
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  ]
});
module.exports = logger;