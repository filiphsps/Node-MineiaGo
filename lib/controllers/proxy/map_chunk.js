module.exports = (packet, player) => {
    if (!player.world)
        player.world = {};
    
    process.nextTick(() => {
        let chunk = new Chunk();
        chunk.load(packet.chunkData, packet.bitMap);
        let pe_chunk = World.ConvertChunk(chunk);

        player.client.writeBatch([{name: 'full_chunk_data', params: {
            chunk_x: packet.x,
            chunk_z: packet.z,
            chunk_data: pe_chunk.dump()
        }}]);
    });
};