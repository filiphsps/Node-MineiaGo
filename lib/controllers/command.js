// MineiaGo
// Copyright (C) 2016  Filiph Sandström
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

module.exports.runCommand = function (cmd, player, callback) {
    let para = cmd.split(' ');
    cmd = para[0].toLowerCase();

    //Remove command from parameters
    para.shift();

    for (var n = 0; n < global.server.commands.length; n++) {
        let command = global.server.commands[n];

        if (command.command === cmd || command.id == cmd) {
            return callback(command.callback(para, {
                player: player
            }));
        }
    }
    callback('Unknown command, try /help for a list of commands');
};

module.exports.registerCommand = function (id, cmd, desc, callback) {
    //FIXME: Validate that we haven't added the command already
    //FIXME: Meta, what wants to add the command
    //FIXME: Support cmd as array
    global.server.commands.push({
        id: id,
        command: cmd,
        description: desc,
        callback: callback
    });
};

//TODO
module.exports.addCommand = function (cmdList, desc, addedBy, callback) {
    global.server.commands.push({
        command: cmdList[0],
        description: desc,
        addedBy: addedBy,
        callback: callback
    });

    if (cmdList.length > 0)
        for (var n = 0; n < cmdList.length; n++)
            global.server.commands.push({
                command: cmdList[n],
                description: desc,
                addedBy: addedBy,
                showInHelp: false,
                callback: callback
            });
};

module.exports.clean = function () {
    for (var n = 0; n < global.server.commands.length; n++) {
        let command = global.server.commands[n];

        if (command.addedBy !== 'AlpineCraft')
            global.server.commands.splice(n, 1);
    }
};