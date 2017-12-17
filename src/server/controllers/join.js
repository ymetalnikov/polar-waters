const { snakeStore } = require('../models/Snake');
const { roomStore } = require('../models/Room');
const { COOKIE_TIME } = require('../../share/config').server;

const join = (request, response) => {
    const cookiesSnakeName = request.cookies.snakeName;
    const snake = snakeStore.findSnakeByCookies(cookiesSnakeName);
    const room = roomStore.getRoomByCookies(request.query.roomid);

    if (!room) {
        response.redirect('/select');
    }

    roomStore.joinToRoom(room, snake);
    response.clearCookie('snakeRoom');
    response.cookie(
        'snakeRoom',
        room.getRoomId(),
        { maxAge: COOKIE_TIME }
    );

    response.redirect('/game');
};

module.exports = join;
