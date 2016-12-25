// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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