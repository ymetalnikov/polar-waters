const { roomStore } = require('../models/Room');

const game = (request, response) => {
    const { snakeRoom, snakeName } = request.cookies;
    const room = roomStore.getRoomByCookies(snakeRoom);
    // Если комнаты не существует
    if (!room) {
        response.redirect('/select');
        return;
    }

    const { snakePool } = room;

    if (snakePool.getLength() === 1) {
        // Если оставшийся в игре обновляет страницу, отправляем его на список комнат
        const snake = snakePool.findSnakeByCookies(snakeName);

        if (snake && snake.isGaming) {
            response.redirect('/select');
            return;
        }
    }

    response.render('pages/game');
};

module.exports = game;
