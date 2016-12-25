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

let log = require(global.sdk + '/util/log'),
    fs  = require('fs');

module.exports = function () {
    log('Loading config...', 0);
    let config = null;

    try {
        config = require(global.sdk + '/../config.json');
    } catch (e) {
        log('config.js does not exist', 1);
        log('Generating new config file...', 0);

        //Copy /lib/resources/config.json to /config.json
        fs.createReadStream(global.sdk + '/resources/config.json')
            .pipe(fs.createWriteStream(global.sdk + '/../config.json'));

        config = require(global.sdk + '/resources/config.json');
    }

    return config;
};

module.exports.save = (property, value, callback) => {
    let config = global.config;
    config[property] = value;
    fs.writeFileSync(global.sdk + '/../config.json', JSON.stringify(config, null, 4) , 'utf-8');

    global.config = module.exports();
    callback();
}

//TODO: Function to generate default config based on a list of default values
//TODO: Function to load default values if a property is missing