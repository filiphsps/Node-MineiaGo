// MineiaGo
// Copyright (C) 2016  Filiph Sandström
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