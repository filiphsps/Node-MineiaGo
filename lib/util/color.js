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

let colors = {
    'aqua': '§b',
    'black': '§0',
    'blue': '§9',
    'bright_green': '§a',
    'cyan': '§b',
    'dark_blue': '§1',
    'dark_gray': '§8',
    'dark_green': '§2',
    'dark_grey': '§8',
    'dark_red': '§4',
    'dark_yellow': '§6',
    'gold': '§6',
    'gray': '§7',
    'green': '§2',
    'grey': '§7',
    'indigo': '§9',
    'lime': '§a',
    'maroon': '§4',
    'navy': '§1',
    'pink': '§d',
    'purple': '§5',
    'red': '§c',
    'silver': '§7',
    'teal': '§3',
    'white': '§f',
    'yellow': '§e'
};

module.exports.color = function (text, color) {
    return colors[color] + text + '§r§f';
};