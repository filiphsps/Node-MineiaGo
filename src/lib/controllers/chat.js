// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';
module.exports.init = () => {
    return;
};

module.exports.subscribe = (channel, callback) => {
    return global.server.chat.on(channel, callback);
};

module.exports.broadcast = (channel, message, sender) => {
    let chat = global.server.chat,
        ch = channel || 'global.users';

    if (sender && sender.formatedUsername)
        message = sender.prefix + sender.formatedUsername + sender.suffix + ' ' + message;

    chat.emit(ch, message, sender);
    if (ch !== 'private.server' && ch !== 'global.users')
        chat.emit('private.server', message, sender);
};
