// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

module.exports.getPlugin = (plugin) => {
    if (!plugin)
        return false;

    for (let n = 0; n < global.server.plugins.length; n++) {
        let pl = global.server.plugins[n];

        if (pl.name.toLowerCase() === plugin.toLowerCase())
            return pl;
    }
    return false;
};
