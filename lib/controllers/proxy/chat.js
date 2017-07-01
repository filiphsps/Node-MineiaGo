module.exports = (packet, player) => {
    let message = JSON.parse(packet.message);
    console.log(message);

    switch (message.translate) {
        case 'chat.type.announcement': {

            let msg = '§5[' + message.with[0].text + '] ';
            for (var n = 0; n < message.with[1].extra.length; n++) {
                msg += message.with[1].extra[n].text;
            }

            chat.broadcast('private.' + player.username, msg, null);
            break;
        }

        case 'chat.type.text': {
            let msg = '<' + message.with[0].text + '> ';
            for (var n = 1; n < message.with.length; n++) {
                msg += message.with[n];
            }

            chat.broadcast('private.' + player.username, msg, null);
            break;
        }

        default:
            chat.broadcast('private.' + player.username, JSON.stringify(message), null);
            console.log(message);
            break;
    };
};