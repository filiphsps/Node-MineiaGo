// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

let chalk       = require('chalk'),
    MCPEColor   = require('node-mcpe-color-parser'),
    config      = null;

module.exports = function (message, level) {
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
    return new Date().toJSON().slice(11, 19);
}