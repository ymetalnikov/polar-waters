const { getFoodCoordinate, getFoodIcon } = require('./utils');

class Food {
    constructor() {
        this.foodCoordinate = null;
        this.foodIcon = null;
    }

    reset() {
        this.foodCoordinate = getFoodCoordinate();
        this.foodIcon = getFoodIcon();
    }

    get() {
        return {
            foodCoordinate: this.foodCoordinate,
            foodIcon: this.foodIcon
        };
    }

}

module.exports = Food;
