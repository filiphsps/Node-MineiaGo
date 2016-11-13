// MineiaGo
// Copyright (C) 2016  Filiph Sandström

'use strict';

let EventEmitter    = require('events'),
    Player          = require(global.sdk + '/models/player'),
    color           = require(global.sdk + '/util/color').color;

module.exports = function () {
    this.commands = [];
    this.pmc = null;

    this.players = [];

    this.events = new EventEmitter();
    this.chat = new EventEmitter();

    this.serverPlayer = new Player();
    this.serverPlayer.uuid = '00000000-0000-0000-0000-000000000000';
    this.serverPlayer.username = 'server';
    this.serverPlayer.prefix = color('[', 'purple');
    this.serverPlayer.subfix = color(']', 'purple');
    this.serverPlayer.formatedUsername = color('Server', 'purple');
    this.serverPlayer.hidden = true;
    this.players.push(this.serverPlayer);
};