import nodeModuleCache from 'fast-boot';
import chalk from 'chalk';
import MCPEColor from 'node-mcpe-color-parser';
import readline from 'readline';

import log from './lib/util/log';
import config from './lib/controllers/config';
import server from './lib/controllers/server';
import command from './lib/controllers/command';
import version from './lib/util/version';

/* Load modules */
let node = process,
    pack = require('../package.json'),
    clog = console.log;

/* Cache modules */
nodeModuleCache.start({});

/* Clear console */
process.stdout.write('\u001b[2J\u001b[0;0H');   //Bash
process.stdout.write('\x1Bc');                  //CMD & Powershell

/* Handle console.log */
const fixStdoutFor = (cli) => {
    let oldStdout = process.stdout,
        newStdout = Object.create(oldStdout);
    newStdout.write = () => {
        cli.output.write('\x1b[2K\r');
        let result = oldStdout.write.apply(
            this,
            Array.prototype.slice.call(arguments)
        );
        cli._refreshLine();
        return result;
    };
    process.__defineGetter__('stdout', () => { return newStdout; });
}

/* Announce */
require('node-bash-title')('MineiaGo');
log(chalk.bgCyan('MineiaGo') + ' by ' + pack.author, 0);
log('Licensed under the ABRMS license');
log('Starting ' + chalk.bgCyan('MineiaGo') + ' version ' + process.platform + '-' + version() + '...', 0);

/* Load config */
global.config = config();

/* Init Server */
server.init();

/* Handle console input */
node.stdin.setEncoding('utf8');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});
fixStdoutFor(rl);
rl.prompt();
rl.on('close', () => {
    onShutdown();
});
rl.on('line', (cmd) => {
    //Remove input echo
    process.stdout.moveCursor(0, 0);
    //process.stdout.clearLine();

    cmd = (cmd + '').trim();

    //Check if server is done initializing
    //if (!global.done && (cmd !== 'about' && cmd !== 'debug'))
    //    return chatHandler('Server is still initializing...', null);

    //FIXME: metadata
    command.runCommand(cmd, global.server.serverPlayer, (err, res) => {
        if (err)
            log(err, 1);
        else if (res)
            log(res, 0);

        rl.prompt();
    });
});

console.log = function () {
    rl.output.write('\x1b[2K\r');
    clog.apply(console, Array.prototype.slice.call(arguments));
    rl._refreshLine();
};

/* Handle console output */
function chatHandler(message, sender) {
    log(MCPEColor(message), 0);
}
global.server.chat.on('global.users', chatHandler);
global.server.chat.on('private.server', chatHandler);

/* Fatal Error */
node.on('uncaughtException', (err) => {
    console.log(err);
    log(err.stack, 3);
});

/* Handle shutdown */
function onForceShutdown() {
    //TODO
}
function onShutdown() {
    node.exit();
}
node.on('exit', onForceShutdown.bind());
node.on('beforeExit', onShutdown.bind());
node.on('SIGINT', onShutdown.bind());
