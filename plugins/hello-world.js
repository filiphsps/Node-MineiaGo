let chat    = require(global.sdk + '/controllers/chat'),
    command = require(global.sdk + '/controllers/command'),
    server  = require(global.sdk + '/controllers/server');

module.exports = {
    'name': 'HelloWorld',
    'version': '1.0.0',
    'author': 'Filiph Sandstrom',
    'description': 'Example plugin to showcase the plugin api',
};

module.exports.onInit = function (callback) {
    //Register hello-world command
    command.registerCommand(
        'helloworld:helloworld',                        //id
        'helloworld',                                   //command
        'Whispers "Hello World" for only you to see',   //description
        (para, meta) => {                               //function
            if (para.length > 0)
                chat.broadcast('global.users', 'Hello ' + para[0] + '!', meta.player);
            else
                chat.broadcast('private.' + meta.player.username, 'Hello World', meta.player);
        });
    
    server.getEvents().on('onPlayerConnect', (player) => {
        chat.broadcast('global.users' + player.username, 'Howdy ' + player.username + '!', null);
    });
    callback();
};