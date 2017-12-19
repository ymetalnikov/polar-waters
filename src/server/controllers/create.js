const { roomBuilder, roomStore  } = require('../models/Room');
const { getStatisticsForSelect } = require('../models/Room/statistics');
const { COOKIE_TIME } = require('../../share/config').server;
const { snakeStore } = require('../models/Snake');
const { emitter, constants: { OPEN_ROOM } } = require('../models/Emitter');

const create = (request, response) => {
    request
        .checkBody('roomName', 'Game name should be is not empty')
        .notEmpty()
    ;

    const cookiesSnakeName = request.cookies.snakeName;
    const snake = snakeStore.findSnakeByCookies(cookiesSnakeName);
    const { roomName } = request.body;
    const errors = request.validationErrors();

    if (errors) {
        const statistics = getStatisticsForSelect(snake.snakeName, cookiesSnakeName);

        response.render(
            'pages/select',
            { error: errors[0].msg, statistics }
        );

        return;
    }

    const room = roomBuilder(snake, roomName);
    const roomCookieSign = room.getRoomId();

    roomStore.addRoom(room);

    emitter.emit(OPEN_ROOM, roomCookieSign);

    response.clearCookie('snakeRoom');
    response.cookie('snakeRoom', roomCookieSign, { maxAge: COOKIE_TIME });
    response.redirect('/game');
};

module.exports = create;
