// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

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

module.exports.color = (text, color) => {
    return colors[color] + text + '§r§f';
};
