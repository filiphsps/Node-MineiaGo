// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';
let log = require(global.sdk + '/util/log');

module.exports.runCommand = function (cmd, player, callback) {
    let para = cmd.split(' ');
    cmd = para[0].toLowerCase();

    //Remove command from parameters
    para.shift();

    for (var n = 0; n < global.server.commands.length; n++) {
        let command = global.server.commands[n];

        if (typeof command.command != 'string' && command.id != cmd) {
            for (var x = 0;  x < command.command.length; x++) {
                if (command.command[x] === cmd) {
                    return callback(command.callback(para, {
                        player: player
                    }));
                }
            }
        }

        if (command.command === cmd || command.id == cmd) {
            return callback(command.callback(para, {
                player: player
            }));
        }
    }
    callback('Unknown command, try /help for a list of commands. ("' + cmd + '")');
};

module.exports.registerCommand = function (id, cmd, desc, callback) {
    //FIXME: Validate that we haven't added the id already
    //FIXME: Meta, what wants to add the command

    for (var n = 0; n < global.server.commands.length; n++) {
        if (global.server.commands[n].id == id)
            return log('A plugin with id "' + id + '" already exists!', 1);;
    }

    global.server.commands.push({
        id: id,
        command: cmd,
        description: desc,
        callback: callback
    });
};

module.exports.clean = () => {
    global.server.commands = [];
}