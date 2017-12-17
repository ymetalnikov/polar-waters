const { randomTileOnField, makeRandomColor } = require('../../utils');

class SnakePool {
    constructor() {
        this._snakePool = [];
    }

    add(snake) {
        const snakeInPool = Object.assign(
            {},
            { name: snake.snakeName, cookies: snake.cookies, snake },
            { color: makeRandomColor(), position: [], isGaming: false }
        );
        this._snakePool.push(snakeInPool);
    }

    addToGame(snake) {
        snake.isGaming = true;
        snake.position = [{
            x: randomTileOnField(),
            y: randomTileOnField()
        }];
    }

    findSnakeByCookies(cookies) {
        return this._snakePool.find((item) => (item.cookies === cookies));
    }

    deleteSnakeByCookies(cookie) {
        this._snakePool = this._snakePool
            .filter((item) => (item.cookie !== cookie));
    }

    gameOverSnakeByCookies(cookie) {
        const snake = this.findSnakeByCookies(cookie);

        if (snake) {
            snake.isGaming = false;
        }
    }

    checkWhoIsInTheGame() {
        return this._snakePool.some((snake) => (snake.isGaming))
    }

    getAllSnakes() {
        return this._snakePool.map((snake) => (snake.snake))
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

module.exports = SnakePool;
