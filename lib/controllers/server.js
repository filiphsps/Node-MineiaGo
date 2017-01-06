// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';

let mcpeProtocol    = require('pocket-minecraft-protocol'),
    command         = require('../controllers/command'),
    chat            = require('../controllers/chat'),
    player          = require('../controllers/player'),
    Server          = require('../models/server'),
    plugins         = require('../controllers/plugins'),
    log             = require('../util/log'),
    pack            = require('../../package.json'),
    color           = require(global.sdk + '/util/color').color,
    Minecraft       = require('minecraft-protocol');

const PROTOCOL  = 100,
    VERSION   = '1.0';

module.exports.init = function () {
    global.server = new Server();

    let initCommands = () => {
        command.registerCommand(
            'mineiago:help',
            'help',
            'Shows a list of all the commands',
            (para, meta) => {
                for (var n = 0; n < global.server.commands.length; n++) {
                    let command = global.server.commands[n],
                        ch = 'private.' + meta.player.username;
                    
                    if (typeof command.command != 'string')
                        for (var x = 0;  x < command.command.length; x++)
                            chat.broadcast(ch, color('/' + command.command[x] + ': ', 'yellow') + command.description);
                    else
                        chat.broadcast(ch, color('/' + command.command + ': ', 'yellow') + command.description);
                }
            });
        command.registerCommand(
            'mineiago:stop',
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
            'mineiago:reload',
            'reload',
            'Reloads the sever (UNSUPPORTED!)',
            (para, meta) => {
                chat.broadcast('private.' + meta.player.username, color('The server is reloading...', 'purple'));
                log('Reloading the server is UNSUPPORTED, Things will go wrong!', 1);

                //Clean-up
                command.clean();
                plugins.clean();
                player.clean();
                //FIXME: Handle eventemitter cleanup!

                //Initialize the modules again
                initCommands();
                plugins.init();
                global.config = require(global.sdk + '/controllers/config')();
            });
        command.registerCommand(
            'mineiago:about',
            'about',
            'Info about the proxy',
            (para, meta) => {
                chat.broadcast('private.' + meta.player.username,
                    color('This server is running ' + color('MineiaGo', 'purple') + ' version ' + color(pack.version, 'blue') + '. It\'s by ' + color(pack.author, 'purple'), 'black'));
            });
        command.registerCommand(
            'mineiago:list',
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
                    color('Players (' + (global.server.players.length - 1) + '):', 'green') + ' ' + out);
            });
        
        command.registerCommand(
            'mineiago:debug',
            'debug',
            'Prints debug information',
            (para, meta) => {
                let output = JSON.stringify({
                    protocol: PROTOCOL,
                    uptime: process.uptime(),
                    players: global.server.players,
                    config: global.config,
                    commands: global.server.commands
                }, null, 4).split(/\r?\n/);

                for (var n = 0; n < output.length; n++) {
                    chat.broadcast('private.' + meta.player.username,
                        color(output[n], 'black')); //TODO
                }
            });
        
        command.registerCommand(
            'mineiago:config',
            'config',
            'Set a config value',
            (para, meta) => {
                if (para.length < 2)
                    return chat.broadcast('private.' + meta.player.username, 'Usage: /config [property] [value]', null);
                
                (require('../controllers/config')).save(para[0], para[1], () => {
                    return chat.broadcast('private.' + meta.player.username, 'Updated config!', null);
                });
            });
        command.registerCommand(
            'mineiago:kickall',
            'kickall',
            'Kick everyone',
            (para, meta) => {
                for (var n = 1; n < global.server.players.length; n++) {
                    global.server.players[n].client.writeMCPE('disconnect', {
                        message: (para[0] ? para[0] : 'You were kicked from the proxy!')
                    });
                }
            });
    };

    //Prepare plugins
    initCommands();
    plugins.init();

    log('Getting MOTD from remote server...', 0);
    Minecraft.ping({
        host: global.config.mcpcIp,
        port: global.config.mcpcPort ? global.config.mcpcPort : 25565
    }, (err, MinecraftServer) => {
        global.motd          = (MinecraftServer !== undefined) ? MinecraftServer.description.text : 'A Minecraft Server';
        global.maxPlayers    = (MinecraftServer !== undefined) ? MinecraftServer.players.max : 20;
        global.onlinePlayers = (MinecraftServer !== undefined) ? MinecraftServer.players.online : 0;

        if (MinecraftServer === undefined || err) {
            log('Could not get MOTD from remote server', 1);
        }

        //Start PMC
        global.server.pmc = mcpeProtocol.createServer({
            host: global.serverIp,
            port: global.serverPort,

            name: 'MCPE;' + global.motd + ';' + PROTOCOL + ';' + VERSION + ';' +
                global.onlinePlayers + ';' + global.maxPlayers, //TODO
            maxPlayers: global.maxPlayers,
            onlinePlayers: global.onlinePlayers
        }, false);
        log('MCPE proxy started on ' + global.config.serverIp + ':' + global.config.serverPort, 0);

        //Init sub-modules
        chat.init();
        player.init();

        //Ping PC Server every 30 seconds to check online player count
        global.pc_ping = setInterval(() => {
            Minecraft.ping({
                host: global.config.mcpcIp,
                port: global.config.mcpcPort ? global.config.mcpcPort : 25565
            }, (err, MinecraftServer) => {
                if (err)
                    return log('Could not get MOTD from remote server', 1);

                global.motd          = (MinecraftServer !== undefined) ? MinecraftServer.description.text : 'A Minecraft Server';
                global.maxPlayers    = (MinecraftServer !== undefined) ? MinecraftServer.players.max : 20;
                global.onlinePlayers = (MinecraftServer !== undefined) ? MinecraftServer.players.online : (global.server.players.length - 1);
                global.server.pmc.name      = 'MCPE;' + global.motd + ';' + PROTOCOL + ';' + VERSION + ';' +
                global.onlinePlayers + ';' + global.maxPlayers;
                log('Updated MOTD, maxPlayers & onlinePlayers', -1);
            });
        }, 30000);

        global.done = true;
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