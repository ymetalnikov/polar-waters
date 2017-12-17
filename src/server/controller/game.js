const { roomMap } = require('../services/Room');

const game = (request, response) => {
    const { snakeRoom, snakeName } = request.cookies;

    if (!roomMap[snakeRoom]) {
        response.redirect('/');
        return
    }

    const { snakePool } = roomMap[snakeRoom];

    // Если оставшийся в игре обновляет страницу отправляем его на главную
    if (snakePool.getLength() === 1 && snakePool.checkWhoIsInTheGame()) {
        const snake = snakePool.findSnakeByCookie(snakeName);
        response.redirect(`/select?name=${snake.name}`);
    }

    response.render('pages/game');
};

module.exports = game;
