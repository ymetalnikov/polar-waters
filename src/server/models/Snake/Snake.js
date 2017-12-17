const { ONE_HOUR } = require('../../constants');

class Snake {
    constructor(cookies, snakeName) {
        this.cookies = cookies;
        this.snakeName = snakeName;
        this.time = new Date().getTime() + ONE_HOUR;
    }

    updateTime() {
        this.time = new Date().getTime() + ONE_HOUR;
    }
}

module.exports = Snake;
