const { roomMap } = require('../services/Room');
const { emitter, constants: { OPEN_ROOM, CLOSE_ROOM } } = require('../services/Emitter');
const socketHandler = require('./socketHandler');
const socket = (io) => {
    emitter.on(OPEN_ROOM, (roomId) => {
        const nameSpace = `/${roomId}`;
        const nsp = io.of(nameSpace);

        nsp.on('connection', function (socket) {
            const room = roomMap[roomId];

            socketHandler(io, socket, room);
        });
    });

    emitter.on(CLOSE_ROOM, function (roomId) {
        delete roomMap[roomId];
    })
};

module.exports = socket;
