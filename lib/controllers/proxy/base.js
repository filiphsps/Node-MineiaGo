// 1.12
module.exports = (packet, player) => {
    player.client_pc.on('disconnect', (packet) => {
        require(global.sdk + '/controllers/proxy/disconnect')(packet, player);
    });

    //0x0f - chat
    player.client_pc.on('chat', (packet) => {
        require(global.sdk + '/controllers/proxy/chat')(packet, player);
    });

    //0x1a - kick_disconnect
    player.client_pc.on('kick_disconnect', (packet) => {
        require(global.sdk + '/controllers/proxy/disconnect')(packet, player);
    });

    //0x2e - position
    player.client_pc.on('position', (packet) => {
        require(global.sdk + '/controllers/proxy/position')(packet, player);
    });

    //0x44 - update_time
    player.client_pc.on('update_time', (packet) => {
        require(global.sdk + '/controllers/proxy/update_time')(packet, player);
    });
};