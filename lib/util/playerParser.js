// MineiaGo
// Copyright (C) 2016  Filiph Sandström
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

let zlib = require('zlib'),
    jwt = require('jwt-simple'),
    fs = require('fs'),
    ProtoDef = require('protodef').ProtoDef;

module.exports = function (packet, callback) {
    try {
        const dataProto = new ProtoDef();
        dataProto.addType('data_chain', ['container', [{
            'name': 'chain',
            'type': ['pstring', {
                'countType': 'li32'
            }]
        }, {
            'name': 'clientData',
            'type': ['pstring', {
                'countType': 'li32'
            }]
        }]]);

        let body = dataProto.parsePacketBuffer('data_chain', zlib.inflateSync(packet.body)),
            chain = null,
            decode = null,
            data = null;
        
        body.data.chain = JSON.parse(body.data.chain);
        chain = body.data.chain.chain[0];

        decode = jwt.decode(chain, 'MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAE8ELkixyLcwlZryUQcu1TvPOmI2B7vX83ndnWRUaXm74wFfa5f/lwQNTfrLVHa2PmenpGI6JhIMUJaWZrjmMj90NoKNFSNBuKdm8rYiXsfaz3K36x/1U26HpG0ZxK/V1V', 'ES384');
        data = jwt.decode(body.data.clientData, decode.identityPublicKey, 'ES384');

        data.SkinData = null;
        callback(null, {
            uuid: (decode.extraData != null) ? decode.extraData.identity : null,
            id: (decode.extraData != null) ? decode.extraData.identityPublicKey : null,
            username: (decode.extraData != null) ? decode.extraData.displayName : null,
            skinData: data.SkinData,
            skinId: data.SkinId
        });
    } catch(err) {
        console.log(err);
    }
};