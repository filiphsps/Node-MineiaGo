// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';
const TIME_MAX_TICK = 24000,
    TIME_DAY_TICK = 0;
//    TIME_NOON_TICK = 6000,
//    TIME_EVENING_TICK = 12000,
//    TIME_NIGHT_TICK = 18000;

let Vector3 = require('vec3');

function World () {
    this.spawn = new Vector3(0, 0, 0);
    this.time = 0;

    global.server.events.on('onGameTick', () => {
        this.time = this.time + 1;

        if (this.time > TIME_MAX_TICK)
            this.time = TIME_DAY_TICK;
    });
}

module.exports = World;