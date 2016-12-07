let chat    = require(global.sdk + '/controllers/chat'),
    command = require(global.sdk + '/controllers/command'),
    server  = require(global.sdk + '/controllers/server');

module.exports = {
    'name': 'HelloWorld',
    'version': '1.0.0',
    'author': 'Filiph Sandstrom',
    'description': 'Example plugin to showcase the plugin api',
};

let onPlayerConnectEvent;
module.exports.onInit = function (callback) {
    //Register helloworld command
    command.registerCommand(
        'helloworld:helloworld',                        //id
        ['helloworld', 'hello-world'],                  //command
        'Whispers "Hello World" for only you to see',   //description
        (para, meta) => {                               //function
            if (para.length > 0)
                chat.broadcast('global.users', 'Hello ' + para[0] + '!', meta.player);
            else
                chat.broadcast('private.' + meta.player.username, 'Hello World', meta.player);
        });
    
    //Handle event
    onPlayerConnectEvent = (player) => {
        chat.broadcast('global.users' + player.username, 'Howdy ' + player.username + '!', null);
    };
    server.getEvents().on('onPlayerConnect', onPlayerConnectEvent);
    callback();
};

module.exports.onClean = () => {
    //Be a good person, clean up the event listeners after you
    server.getEvents().removeListener('onPlayerConnect', onPlayerConnectEvent);
}