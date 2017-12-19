const { roomStore } = require('../models/Room');
const { Snake, snakeStore } = require('../models/Snake');
const { COOKIE_TIME } = require('../../share/config').server;
const utils = require('../utils');

const login = (request, response) => {
    request
        .checkBody('name', 'Name should be is not empty')
        .notEmpty()
    ;

    const errors = request.validationErrors();

    if (errors) {
        response.render('pages/login', { error: errors[0].msg, countOfPlayers: 0, statistics: [] });
    } else {
        const snakeName = request.cookies.snakeName;

        if (snakeName) { // При повторном вводе имени удаляем куки и змею из хранилища.
            response.clearCookie('snakeRoom');
            response.clearCookie('snakeName');

            roomStore.clearByCookies(snakeName);
        }

        const snakeCookieSign = utils.getRandom();

        snakeStore.addSnake(new Snake(snakeCookieSign, request.body.name));
        response.cookie(
            'snakeName',
            snakeCookieSign,
            { maxAge: COOKIE_TIME }
        );

        response.redirect('/select');
    }
};

module.exports = login;
