const Snake = require('./Snake');
const SnakeStore = require('./SnakeStore');
const { singleInstanceHOC } = require('../../hoc');

module.exports = {
    snakeStore: singleInstanceHOC(SnakeStore).getInstance(),
    Snake,
};