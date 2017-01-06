// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';
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
        message = sender.prefix + sender.formatedUsername + sender.suffix + ' ' + message;

    chat.emit(ch, message, sender);
    if (ch !== 'private.server' && ch !== 'global.users')
        chat.emit('private.server', message, sender);
};