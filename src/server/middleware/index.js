const { snakeStore } = require('../models/Snake');
const publicURLs = ['/', '/login'];

/**
 * Проверяем наличие кук змейки в хранилище snakeStore
 * Если змейка не найдена сбрасывем уходим на главную
 * @param request
 * @param response
 * @param next
 */
const checkAuth = (request, response, next) => {
    if (
        publicURLs.indexOf(request.url) === -1
        && (
            request.cookies.snakeName === undefined
            || !snakeStore.findSnakeByCookies(request.cookies.snakeName)
        )

    ) {
        response.redirect('/');
    }
    else {
        next();
    }
};

module.exports = {
    checkAuth
};