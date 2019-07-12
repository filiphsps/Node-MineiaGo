import log from '../util/log';

module.exports.runCommand = (cmd, player, callback) => {
    let para = cmd.split(' ');
    cmd = para[0].toLowerCase();

    //Remove command from parameters
    para.shift();

    for (let n = 0; n < global.server.commands.length; n++) {
        let command = global.server.commands[n];

        if (typeof command.command != 'string' && command.id != cmd) {
            for (let x = 0;  x < command.command.length; x++) {
                if (command.command[x] === cmd) {
                    return callback(command.callback(para, {
                        player: player
                    }));
                }
            }
        }

        if (command.command === cmd || command.id === cmd) {
            return callback(command.callback(para, {
                player: player
            }));
        }
    }
    callback('Unknown command, try /help for a list of commands. ("' + cmd + '")');
};

module.exports.registerCommand = (id, cmd, desc, callback) => {
    //FIXME: Validate that we haven't added the id already
    //FIXME: Meta, what wants to add the command

    for (let n = 0; n < global.server.commands.length; n++) {
        if (global.server.commands[n].id === id)
            return log('A plugin with id "' + id + '" already exists!', 1);
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
