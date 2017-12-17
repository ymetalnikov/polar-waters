const { roomMap } = require('../services/Room');
const utils = require('../utils');
const { MAX_COOKIES_AGE, MINUTE } = require('../constants');

const joinToRoom = (roomId, snakeName, snakeNameCookies) => {
    let snakeCookieSign = utils.getRandom();
    const room = roomMap[roomId];
    const snakePool = room.getSnakePool();

    Object.values(roomMap).forEach((room) => {
        const snakePool = room.getSnakePool();

        snakePool.deleteSnakeByCookies(snakeNameCookies);
    });

    snakePool.add({
        name: snakeName,
        cookie: snakeCookieSign,
    });

    return { roomCookieSign: roomId, snakeCookieSign }
};

const join = (request, response) => {
    const snakeNameCookies = request.cookies.snakeName;
    const { roomCookieSign, snakeCookieSign } = joinToRoom(
        request.query.roomid,
        request.query.name,
        snakeNameCookies
    );

    response.clearCookie('snakeRoom');
    response.clearCookie('snakeName');

    response.cookie(
        'snakeRoom',
        roomCookieSign,
        { maxAge: MAX_COOKIES_AGE * MINUTE }
    );

    response.cookie(
        'snakeName',
        snakeCookieSign,
        { maxAge: MAX_COOKIES_AGE * MINUTE }
    );

    response.redirect('/game');
};

module.exports = join;
