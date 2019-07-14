let Vector3 = require('vec3');

class Player {
    secret     = null;
    uuid       = null;
    id         = null;
    pc_id      = null;
    teleportId = null;

    username   = null;
    m_username = null;
    m_password = null;
    m_email    = null;

    waiting_m_email = false;
    waiting_m_passw = false;
    connected_to_pc = false;

    prefix     = '<';
    suffix     = '>';
    formatedUsername = null;

    pos        = new Vector3(0, 0, 0);
    speed      = new Vector3(0, 0, 0);

    hunger     = 0;
    health     = 0;
    dimension  = 0;
    gameMode   = 0;
    hidden     = false;

    //Test
    world = null;
};

module.exports = Player;
