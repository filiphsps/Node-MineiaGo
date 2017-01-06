// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';

let EventEmitter    = require('events'),
    color           = require(global.sdk + '/util/color').color;

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