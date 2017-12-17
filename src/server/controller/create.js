const { roomMap, Room } = require('../services/Room');
const { getStatisticsForSelect } = require('../services/Room/statistics');
const { MAX_COOKIES_AGE, MINUTE } = require('../constants');
const utils = require('../utils');
const SnakePoolService = require('../services/SnakePool');
const FoodService = require('../services/Food');
const { emitter, constants: { OPEN_ROOM } } = require('../services/Emitter');
const createRoom = (snakeName, roomName) => {
    let snakeCookieSign = utils.getRandom();
    const roomCookieSign = utils.getRandom();
    const snakePool = new SnakePoolService();

    snakePool.add({
        name: snakeName,
        cookie: snakeCookieSign,
    });

    roomMap[roomCookieSign] = new Room(
        roomCookieSign,
        roomName,
        snakePool,
        new FoodService()
    );

    emitter.emit('OPEN_ROOM', roomCookieSign);

    return { roomCookieSign, snakeCookieSign };
};

const create = (request, response) => {
    request
        .checkBody("roomName", "Game name should be is not empty")
        .notEmpty()
    ;

    const cookiesSnakeName = request.cookies.snakeName;
    const { snakeName, roomName } = request.body;
    const errors = request.validationErrors();

    if (errors) {
        const statistics =  getStatisticsForSelect(snakeName, cookiesSnakeName);

        response.render(
            'pages/select',
            {
                error: errors[0].msg,
                statistics,
                name: request.body.name,
            }
        );

        return
    }
    const { roomCookieSign, snakeCookieSign } = createRoom(snakeName, roomName);

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

module.exports = create;
