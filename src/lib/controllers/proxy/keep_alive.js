module.exports = (packet, player) => {
    player.client_pc.write('keep_alive', packet);
};