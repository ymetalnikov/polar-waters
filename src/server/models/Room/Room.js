class Room {
    constructor(identity, name, snakePool, food) {
        this._identity = identity;
        this.name = name;
        this.snakePool = snakePool;
        this.food = food;
    }

    getRoomId() {
        return this._identity;
    }

    getName() {
        return this.name;
    }

    getSnakePool() {
        return this.snakePool;
    }

    getFood() {
        return this.food;
    }
}

module.exports = Room;
