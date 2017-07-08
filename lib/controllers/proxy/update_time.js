module.exports = (packet, player) => {
    player.client.writePacket('set_time', {
        time: packet.time[1],
        started: 1,
    });
};