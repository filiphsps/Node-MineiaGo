module.exports = (packet, player) => {
    player.client.writePacket('set_health', {
        health: packet.health
    });

    //TODO: handle hunger
};