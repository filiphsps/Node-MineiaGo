module.exports = (packet, player) => {
    //TODO: Handle dimensions
    player.client.writePacket('respawn', {
        x: player.pos.x,
        y: player.pos.y,
        z: player.pos.z
    });
};