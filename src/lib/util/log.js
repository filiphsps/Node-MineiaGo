// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';

let chalk       = require('chalk'),
    MCPEColor   = require('node-mcpe-color-parser'),
    config      = null;

module.exports = (message, level) => {
    try {
        config = require(global.sdk + '/../config.js');
    } catch (e) {
        config = {
            logLevel: 0
        };
    }

    let msg = '[' + getFormatedTime() + ' ',
        logLevel = config.logLevel;

    if (level < logLevel)
        return;

    message = MCPEColor(message);
    
    switch (level) {
        case -1:
            msg += 'DEBUG]';
            msg = chalk.gray(msg);
            break;
        case 1:
            msg += 'WARNING]';
            msg = chalk.yellow(msg);
            break;

        case 2:
            msg += 'ERROR]';
            msg = chalk.red(msg);
            break;

        case 3:
            msg += 'FATAL]';
            msg = chalk.blue(msg);
            break;

        default:
        case 0:
            msg += 'INFO]';
            msg = chalk.cyan(msg);
            break;
    }

    msg += ': ' + message;
    console.log(msg);
};

function getFormatedTime () {
    return new Date().toLocaleTimeString();
}
