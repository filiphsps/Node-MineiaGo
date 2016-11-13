// MineiaGo
// Copyright (C) 2016  Filiph Sandström

'use strict';

let command = require(global.sdk + '/controllers/command');

module.exports.init = function () {
    return;
};

module.exports.subscribe = function (channel, callback) {
    return global.server.chat.on(channel, callback);
};

module.exports.broadcast = function (channel, message, sender) {
    let chat = global.server.chat,
        ch = channel || 'global.users';

    if (sender && sender.formatedUsername)
        message = sender.prefix + sender.formatedUsername + sender.subfix + ' ' + message;

    chat.emit(ch, message, sender);
    if (ch !== 'private.server' && ch !== 'global.users')
        chat.emit('private.server', message, sender);
};