module.exports = (packet, player) => {
    module.exports.sendChat(player, 'You have been disconnected from the server. Reason: ' + packet.reason);
};