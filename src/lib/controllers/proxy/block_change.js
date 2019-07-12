module.exports = (packet, player) => {
    player.client.writePacket('update_block', {
        blocks: [
            {
                x: packet.location.x,
                y: packet.location.y,
                z: packet.location.z,
                blockId: packet.type,
                blockData: 0xb,
                flags: (0 & 0x8)
            }
        ]
    });
};