const { ONE_HOUR, ONE_MINUTE } = require('../server/constants');

module.exports = {
    client: {
        gameContainerId: 'game-container',
        gridSize: 10, // grid size
        tileCount: 60, // tile count
        snakeWaist: 5,
    },
    server: {
        COOKIE_TIME: ONE_HOUR, // Время жизни куки клиента
        CLEANING_INTERVAL: ONE_MINUTE * 10, // Время удаления бездейсвующих сессий
        START_SNAKE_LIVE_TIME: ONE_MINUTE * 10, // Время сесии
    }
};