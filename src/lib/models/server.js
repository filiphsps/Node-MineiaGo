import { color } from '../util/color';

let EventEmitter    = require('events');

module.exports = function () {
    this.commands = [];
    this.pmc = null;

    this.players = [];
    this.plugins = [];

    this.events = new EventEmitter();
    this.chat = new EventEmitter();

    this.serverPlayer = {
        hidden: true,
        uuid: '00000000-0000-0000-0000-000000000000',
        username: 'server',
        formatedUsername: color('Server', 'purple'),
        prefix: color('[', 'purple'),
        suffix: color(']', 'purple')
    };
    this.players.push(this.serverPlayer);
};
