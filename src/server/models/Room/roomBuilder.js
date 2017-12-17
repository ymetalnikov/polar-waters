const Room = require('./Room');
const SnakePool = require('../SnakePool');
const Food = require('../Food');
const utils = require('../../utils');

const roomBuilder = (snake, roomName) => {
    const roomCookieSign = utils.getRandom();
    const snakePool = new SnakePool();

    snakePool.add(snake);

    return new Room(
        roomCookieSign,
        roomName,
        snakePool,
        new Food()
    );
};

module.exports = roomBuilder;
