class SnakeStore {
    constructor() {
        this._snakeMap = {};
    }

    addSnake(snake) {
        this._snakeMap[snake.cookies] = snake;
    }

    clearObsolete() {
        const currentTime = new Date().getTime();

        for (let key in this._snakeMap) {
            if (
                this._snakeMap.hasOwnProperty(key)
                && this._snakeMap[key].expiredTime < currentTime
            ) {
                delete this._snakeMap[key];
            }
        }
    }

    getSnakeList() {
        return Object.values(this._snakeMap);
    }

    findSnakeByCookies(cookies) {
        return this._snakeMap[cookies];
    }
}

module.exports = SnakeStore;
