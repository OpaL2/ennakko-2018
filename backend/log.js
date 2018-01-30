'use strict';

var winston = require('winston');

var transports = [
  new (winston.transports.Console)({
    name: 'console'
  }),
  new winston.transports.DailyRotateFile({
    name: 'file',
    filename: 'log/er.log'
  }),
  new winston.transports.DailyRotateFile({
    name: 'file-error',
    filename: 'log/er-error.log',
    level: 'error',
    handleExceptions: true,
    humanReadableUnhandledException: true
  })
];
}

module.exports = new (winston.Logger)({transports: transports});
