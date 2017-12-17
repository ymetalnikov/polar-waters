const { ONE_HOUR, ONE_MINUTE } = require('./constants');

module.exports = {
    COOKIE_TIME: ONE_HOUR, // Время жизни куки клиента
    CLEANING_INTERVAL: ONE_MINUTE * 10, // Время удаления бездейсвующих сессий
    START_SNAKE_LIVE_TIME: ONE_MINUTE * 10, // Время сесии
};
