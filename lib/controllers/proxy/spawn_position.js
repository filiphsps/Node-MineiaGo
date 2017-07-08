module.exports = (packet, player) => {
    player.client.writePacket('set_spawn_position', {
        spawn_type: 0,
        coordinates: {
            x: packet.location.x,
            y: packet.location.y,
            z: packet.location.z
        },
        forced: false
    });
};