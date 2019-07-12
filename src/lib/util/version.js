// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

//FIXME: Create package details module
'use strict';

let pack = require('../../../package.json');

const GetVersion = () => {
    return pack.version;
};

export default GetVersion;
