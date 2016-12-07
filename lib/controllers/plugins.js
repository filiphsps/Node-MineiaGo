let log     = require(global.sdk + '/util/log'),
    command = require('../controllers/command'),
    plugin  = require('../controllers/plugin'),
    chat    = require('../controllers/chat'),
    color   = require(global.sdk + '/util/color').color,
    path    = require('path'),
    fs      = require('fs');

function loadPlugin (file) {
    let plugin = require('../../plugins/' + file);

    log(color('Enabling ' + plugin.name + ' v' + plugin.version + '...', 'green'), 0);

    //Add reference to server object
    global.server.plugins.push(plugin);

    //FIXME: Use EventEmitter
    plugin.onInit(() => {
        log(color(plugin.name + ' Enabled!', 'green'), 0);
    });
}

module.exports.init = function () {
    let dir = path.join(__dirname, '../../plugins');
    fs.readdirSync(dir).forEach(loadPlugin);

    //Add Plugin related commands
    command.registerCommand(
        'mineiago:plugins',
        'plugins',
        'Shows a list of all the plugins',
        (para, meta) => {
            let out = color('Plugins (' + global.server.plugins.length + '): ', 'green'),
                ch = 'private.' + meta.player.username;

            for (var n = 0; n < global.server.plugins.length; n++) {
                let plugin = global.server.plugins[n];

                if (plugin.active)
                    out += coloar(plugin.name, 'green');
                else
                    out += color(plugin.name, 'yellow');

                if (n + 1 < global.server.plugins.length)
                    out += ', ';
            }

            chat.broadcast(ch, out);
        });
    command.registerCommand(
        'mineiago:plugin',
        'plugin',
        'Shows a plugin\'s description',
        (para, meta) => {
            let ch = 'private.' + meta.player.username,
                pl = plugin.getPlugin(para[0]);
            if (para.length < 1 || para.length > 1)
                return chat.broadcast(ch, 'Usage: /plugin [plugin-name]');

            if (pl) {
                chat.broadcast(ch, color(pl.name, 'green'));
                chat.broadcast(ch, color('Version: ', 'yellow') + pl.version);
                chat.broadcast(ch, color('Author: ', 'yellow') + pl.author);
                chat.broadcast(ch, color('Description: ', 'yellow') + pl.description);
            } else
                chat.broadcast(ch, 'Unknown plugin, try /plugins for a list of plugins');
        });
};