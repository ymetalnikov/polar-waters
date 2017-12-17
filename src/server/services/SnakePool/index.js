const { randomTileOnField, makeRandomColor } = require('../../utils');

class SnakePoolService {
    constructor() {
        this._snakePool = [];
    }

    add(item) {
        const snake = Object.assign(
            item,
            { color: makeRandomColor(), position: [], isGaming: false }
        );

        this._snakePool.push(snake);
    }

    addToGame(snake) {
        snake.isGaming = true;
        snake.position = [{
            x: randomTileOnField(),
            y: randomTileOnField()
        }];
    }

    findSnakeByCookie(cookie) {
        return this._snakePool.find((item) => (item.cookie === cookie));
    }

    deleteSnakeByCookies(cookie) {
        this._snakePool = this._snakePool
            .filter((item) => (item.cookie !== cookie));
    }

    gameOverSnakeByCookies(cookie) {
        const snake = this.findSnakeByCookie(cookie);

        if (snake) {
            snake.isGaming = false;
        }
    }

    checkWhoIsInTheGame() {
        return this._snakePool.some((snake) => (snake.isGaming))
    }

    getGameStatistic() {
        return this._snakePool.map((snakeItem) => ({
            name: snakeItem.name,
            color: snakeItem.color,
            position: snakeItem.position
        }));
    }

    reset() {
        this._snakePool = [];
    }

    getRivals(snake) {
        const snakePoolWithOutCurrent = this._snakePool.filter(
            (snakeItem) => (snake && snakeItem.name !== snake.name && snakeItem.isGaming)
        );

        return snakePoolWithOutCurrent.map((snakeItem) => ({
            name: snakeItem.name,
            color: snakeItem.color,
            position: snakeItem.position
        }));
    }

    getLength() {
        return this._snakePool.length
    }
}

module.exports = SnakePoolService;
