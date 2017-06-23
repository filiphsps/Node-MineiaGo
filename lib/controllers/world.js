// MineiaGo
// Copyright (C) 2016-2017  Filiph Sandström
// Licensed under the ABRMS license

'use strict';
let PrisChunk = require('prismarine-chunk')('pe_1.0');

module.exports.ConvertChunk = (chunk) => {
    let pe_chunk = new PrisChunk();

    var x, y, z;
    for (x = 0; x < 16; x++) {
        for (z = 0; z < 16; z++) {
            for (y = 0; y < 256; y++) {
                pe_chunk.setBlockType(new Vector3(x, y, z), chunk.getBlockType(new Vector3((15 - x), y, z)));
                //pe_chunk.setBlock(new Vector3(x, y, z), chunk.getBlock(new Vector3((15 - x), y, z)));

                //pe_chunk.setBlockData(new Vector3(x, y, z), chunk.getBlockData(new Vector3((15 - x), y, z))); //TODO
                //pe_chunk.setBiome(new Vector3(x, y, z), chunk.getBiome(new Vector3((15 - x), y, z)));
                //pe_chunk.setBiomeColor(new Vector3(x, y, z), 141, 184, 113);

                pe_chunk.setSkyLight(new Vector3(x, y, z), chunk.getBlockLight(new Vector3(x, y, z)));
                //pe_chunk.setBlockLight(new Vector3(x, y, z), chunk.getBlockLight(new Vector3(x, y, z)));
            }
        }
    }

    return pe_chunk;
}