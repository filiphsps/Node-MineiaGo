// MineiaGo
// Copyright (C) 2016  Filiph Sandström

'use strict';

let Vector3 = require('vec3');

function Player () {
    this.secret     = null;
    this.uuid       = null;
    this.id         = null;
    this.pc_id      = null;
    this.teleportId = null;

    this.username   = null;
    this.m_username = null;
    this.m_password = null;
    this.m_email    = null;

    this.waiting_m_email = false;
    this.waiting_m_passw = false;
    this.connected_to_pc = false;

    this.prefix     = '<';
    this.subfix     = '>';
    this.formatedUsername = null;

    this.pos        = new Vector3(0, 0, 0);
    this.speed      = new Vector3(0, 0, 0);

    this.hunger     = 0;
    this.health     = 0;
    this.dimension  = 0;
    this.gameMode   = 0;
    this.hidden     = false;

    //Test
    this.world = null;
}

module.exports = Player;