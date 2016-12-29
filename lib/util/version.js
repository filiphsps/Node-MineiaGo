// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

//FIXME: Create package details module
'use strict';

let pack = require(global.sdk + '/../package.json');
module.exports = function () {
    return pack.version;
};