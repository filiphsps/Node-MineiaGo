module.exports = (packet, player) => {
    player.teleportId = packet.teleportId;

    player.client_pc.write('teleport_confirm', {
        teleportId: player.teleportId
    });

    player.pos.x = packet.x;
    player.pos.y = packet.y;
    player.pos.z = packet.z;
    player.yaw = packet.yaw;
    console.log(packet);
    
    player.client.writePacket('move_player', {
        entity_id: 0,
        x: packet.x,
        y: packet.y,
        z: packet.z,
        pitch: 0,
        head_yaw: 0,
        yaw: 0,
        mode: 1,
        on_ground: true
    });
    /*player.client.writePacket('respawn', {
        x: packet.x,
        y: packet.y + 1.62,
        z: packet.z
    });*/
    /*player.client.writePacket('play_status', {
        status: 3
    });*/
}