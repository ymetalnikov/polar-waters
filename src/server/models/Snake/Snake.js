const { ONE_HOUR } = require('../../constants');

class Snake {
    constructor(cookies, snakeName) {
        this.cookies = cookies;
        this.snakeName = snakeName;
        this.expiredTime = new Date().getTime() + ONE_HOUR;
    }

    updateExpiredTime() {
        this.expiredTime = new Date().getTime() + ONE_HOUR;
    }
}

module.exports = Snake;
