const winston = require('winston');
require('express-async-errors');

module.exports = function(){
    winston.add(winston.transports.File, {filename: 'logfile.log'})

    winston.exceptions.handle(
        new winston.transports.Console({
            colorize: true, prettyPrint: true
        }),
        new winston.transports.File({filename: 'uncaughtexecptions.log'})
    );

    winston.rejections.handle(
        new winston.transports.Console({
            colorize: true, prettyPrint: true
        }),
        new winston.transports.File({filename: 'unhandledrejections.log'})
    )
}