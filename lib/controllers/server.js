// MineiaGo
// Copyright (C) 2016  Filiph Sandström

'use strict';

let mcpeProtocol    = require('pocket-minecraft-protocol'),
    command         = require('../controllers/command'),
    chat            = require('../controllers/chat'),
    player          = require('../controllers/player'),
    Server          = require('../models/server'),
    log             = require('../util/log'),
    pack            = require('../../package.json'),
    color           = require(global.sdk + '/util/color').color,
    Minecraft       = require('minecraft-protocol');

const PROTOCOL = 91;

module.exports.init = function () {
    global.server = new Server();

    command.registerCommand(
        'help',
        'Shows a list of all the commands',
        (para, meta) => {
            for (var n = 0; n < global.server.commands.length; n++) {
                let command = global.server.commands[n],
                    ch = 'private.' + meta.player.username;

                chat.broadcast(ch, color('/' + command.command + ': ', 'yellow') + command.description);
            }
        });
    command.registerCommand(
        'stop',
        'Stops the server',
        (para, meta) => {
            global.server.events.emit('onServerStop', 'Stopping the proxy...');

            chat.broadcast(null, 'Stopping the proxy...');
            module.exports.clean(() => {
                process.emit('beforeExit');
            });
        });
    command.registerCommand(
        'about',
        'Info about the proxy',
        (para, meta) => {
            chat.broadcast('private.' + meta.player.username,
                'This server is running MineiaGo version ' + pack.version + '. It\'s by ' + pack.author);
        });
    command.registerCommand(
        'list',
        'Lists the current online players',
        (para, meta) => {
            let out = '';
            for (var n = 1; n < global.server.players.length; n++) {
                out += global.server.players[n].formatedUsername;

                if (n + 1 < global.server.players.length)
                    out += ', ';
            }
            chat.broadcast('private.' + meta.player.username,
                'Players (' + (global.server.players.length - 1) + '): ' + out);
        });
    
    command.registerCommand(
        'debug',
        'Prints debug information',
        (para, meta) => {

            //Players array
            chat.broadcast('private.' + meta.player.username,
                JSON.stringify({
                    protocol: PROTOCOL,
                    uptime: process.uptime(),
                }, null, 2)); //TODO
        });

    
    //TODO: Update online players every 30 seconds or somethin'
    log('Getting MOTD from remote server...', 0);

    Minecraft.ping({
        host: global.config.mcpcIp,
        port: 25565, //TODO
    }, (err, MinecraftServer) => {
        const motd          = (MinecraftServer != undefined) ? MinecraftServer.description.text : 'A Minecraft Server';
        const maxPlayers    = (MinecraftServer != undefined) ? MinecraftServer.players.max : 20;
        const onlinePlayers = (MinecraftServer != undefined) ? MinecraftServer.players.online : 0;

        if(MinecraftServer == undefined) {
            log('Could not get MOTD from remote server', 1);
        }

        //Start PMC
        global.server.pmc = mcpeProtocol.createServer({
            host: global.config.serverIp,
            port: global.config.serverPort,

            name: 'MCPE;' + motd + ';' + PROTOCOL + ';' + '0.16.0' + ';'
                + onlinePlayers + ';' + maxPlayers, //TODO
            maxPlayers: maxPlayers,
            onlinePlayers: onlinePlayers,
        });
        log('MCPE server started on ' + global.config.serverIp + ':' + global.config.serverPort, 0);

        //Init sub-modules
        chat.init();
        player.init();

        log('Done(' + Math.floor(process.uptime()) + 's)! for help type "help"');
    });
};

module.exports.clean = function (callback) {
    //Cleanup after sub-modules
    command.clean();

    callback();
};

module.exports.getEvents = function () {
    return global.server.events;
};

module.exports.PROTOCOL = PROTOCOL;