const { generateFoodCoordinate, getFoodIcon } = require('./utils');

class Food {
    constructor() {
        this.foodCoordinate = null;
        this.foodIcon = null;
    }

    setFoodCoordinate(foodCoordinate) {
        this.foodCoordinate = foodCoordinate;
    }

    setFoodIcon() {
        this.foodIcon = getFoodIcon();
    }

    get() {
        return {
            foodCoordinate: this.foodCoordinate,
            foodIcon: this.foodIcon
        };
    }

}

// exports.generateFoodCoordinate = generateFoodCoordinate;
module.exports = {
    Food,
    generateFoodCoordinate
};
