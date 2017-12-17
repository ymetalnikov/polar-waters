const { roomStore } = require('../models/Room');
const { emitter, constants: { OPEN_ROOM, CLOSE_ROOM } } = require('../models/Emitter');
const socketHandler = require('./socketHandler');
const socket = (io) => {
    emitter.on(OPEN_ROOM, (roomId) => {
        const nameSpace = `/${roomId}`;
        const nsp = io.of(nameSpace);

        nsp.on('connection', function (socket) {
            const room = roomStore.getRoomByCookies(roomId);

            socketHandler(io, socket, room);
        });
    });

    emitter.on(CLOSE_ROOM, function (roomId) {
        roomStore.deleteRoomByCookies(roomId);
    })
};

module.exports = socket;
