// MineiaGo
// Copyright (C) 2016  Filiph Sandström

'use strict';

/* Set globals */
var path    = require('path');
global.sdk  = path.dirname(require.main.filename) + '/lib';

/* Load modules */
let node            = process,
    chalk           = require('chalk'),
    log             = require('./lib/util/log'),
    server          = require('./lib/controllers/server'),
    pack            = require('./package.json'),
    MCPEColor       = require('node-mcpe-color-parser'),
    command         = require('./lib/controllers/command');

/* Announce */
log(chalk.bgCyan('MineiaGo') + ' by ' + pack.author, 0);
log('Starting ' + chalk.bgCyan('MineiaGo') + ' version ' + require(global.sdk + '/util/version')() + '...', 0);

/* Load config */
global.config = require(global.sdk + '/controllers/config')();

/* Init Server */
server.init();

/* Handle console input */
node.stdin.setEncoding('utf8');
node.stdin.on('data', (cmd) => {
    cmd = (cmd + '').trim();

    //Check if server is done initializing
    if (!global.done && (cmd !== 'about' && cmd !== 'debug'))
        return chatHandler('Server is still initializing...', null);

    //FIXME: metadata
    command.runCommand(cmd, global.server.serverPlayer, (err, res) => {
        if (err)
            log(err, 1);
        else if (res)
            log(res, 0);
    });
});

/* Handle console output */
function chatHandler (message, sender) {
    log(MCPEColor(message), 0);
}
global.server.chat.on('global.users', chatHandler);
global.server.chat.on('private.server', chatHandler);

/* Fatal Error */
node.on('uncaughtException', function (err) {
    console.log(err);
    log(err.stack, 3);
});

/* Handle shutdown */
function onForceShutdown () {
    //TODO
}
function onShutdown () {
    node.exit();
}
node.on('exit', onForceShutdown.bind());
node.on('beforeExit', onShutdown.bind());
node.on('SIGINT', onShutdown.bind());