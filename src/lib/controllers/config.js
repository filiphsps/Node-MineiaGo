import fs from 'fs';

import log from '../util/log';

module.exports = () => {
    log('Loading config...', 0);
    let config = null;

    try {
        config = require('../../../config.json');
    } catch (e) {
        log('config.js does not exist', 1);
        log('Generating new config file...', 0);

        //Copy /lib/resources/config.json to /config.json
        fs.createReadStream('./../src/lib/resources/config.json')
            .pipe(fs.createWriteStream('config.json'));

        config = require('./../src/lib/resources/config.json');
    }

    return config;
};

module.exports.save = (property, value, callback) => {
    let config = global.config;
    config[property] = value;
    fs.writeFileSync('../../../config.json', JSON.stringify(config, null, 4) , 'utf-8');

    global.config = module.exports();
    callback();
}

//TODO: Function to generate default config based on a list of default values
//TODO: Function to load default values if a property is missing
