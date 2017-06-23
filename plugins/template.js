// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

let chat    = require(global.sdk + '/controllers/chat'),
    command = require(global.sdk + '/controllers/command'),
    server  = require(global.sdk + '/controllers/server');

module.exports = {
    'name': 'template',
    'version': '1.0.0',
    'author': 'MineiaGo',
    'description': 'template plugin',

    'disabled': true
};

let onPlayerConnectEvent;
module.exports.onInit = (callback) => {
    //Register helloworld command
    command.registerCommand(
        'helloworld:helloworld',                        //command id [namespace:command]
        ['helloworld', 'hello-world'],                  //command(s)
        'TEMPORARY DESCRIPTION',                        //description
        (para, meta) => {                               //function
            
            //para => array of arguments passed to the command
            //meta => information about the player/entity executing the command

        });
    
    //Handle events
    onPlayerConnectEvent = (player) => {
        //player => a player object
    };
    server.getEvents().on('onPlayerConnect', onPlayerConnectEvent);
    callback();
};

module.exports.onClean = () => {
    //Be a good person, clean up the event listeners after you
    server.getEvents().removeListener('onPlayerConnect', onPlayerConnectEvent);
}