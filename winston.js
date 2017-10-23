'use strict';

const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const auditFormat = printf(info => {
    return `${info.timestamp}[${info.level}]: ${info.message}`;
  });

const logger = winston.createLogger({
    level:'info',
    format:combine(
        timestamp(),
        auditFormat
    ),
    transports: [
        new winston.transports.Console({colorize:true}),
        new winston.transports.File({filename:'./log/audit.log'})
    ]
});
module.exports = logger;