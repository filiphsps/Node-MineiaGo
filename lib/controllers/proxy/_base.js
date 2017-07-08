// 1.12
module.exports = (packet, player) => {
    player.client_pc.on('disconnect', (packet) => {
        require(global.sdk + '/controllers/proxy/disconnect')(packet, player);
    });

    //0x0b - block_change
    player.client_pc.on('block_change', (packet) => {
        require(global.sdk + '/controllers/proxy/block_change')(packet, player);
    });

    //0x0f - chat
    player.client_pc.on('chat', (packet) => {
        require(global.sdk + '/controllers/proxy/chat')(packet, player);
    });

    //0x1a - kick_disconnect
    player.client_pc.on('kick_disconnect', (packet) => {
        require(global.sdk + '/controllers/proxy/disconnect')(packet, player);
    });

    //0x1a - unload_chunk
    player.client_pc.on('unload_chunk', (packet) => {
        require(global.sdk + '/controllers/proxy/unload_chunk')(packet, player);
    });

    //0x20 - map_chunk
    player.client_pc.on('map_chunk', (packet) => {
        require(global.sdk + '/controllers/proxy/map_chunk')(packet, player);
    });

    //0x2e - position
    player.client_pc.on('position', (packet) => {
        require(global.sdk + '/controllers/proxy/position')(packet, player);
    });

    //0x33 - respawn
    player.client_pc.on('respawn', (packet) => {
        require(global.sdk + '/controllers/proxy/respawn')(packet, player);
    });

    //0x3e - update_health
    player.client_pc.on('update_health', (packet) => {
        require(global.sdk + '/controllers/proxy/update_health')(packet, player);
    });

    //0x43 - spawn_position
    player.client_pc.on('spawn_position', (packet) => {
        require(global.sdk + '/controllers/proxy/spawn_position')(packet, player);
    });

    //0x44 - update_time
    player.client_pc.on('update_time', (packet) => {
        require(global.sdk + '/controllers/proxy/update_time')(packet, player);
    });
};