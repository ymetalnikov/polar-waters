const { randomTileOnField } = require('../../utils');

// Так как еда занимает 2x2, уменьшаем поле.
const REDUCE_FOOD_AREA = 1;

function getFoodCoordinate() {
    return {
        x: randomTileOnField(REDUCE_FOOD_AREA),
        y: randomTileOnField(REDUCE_FOOD_AREA),
    };
}

function getFoodIcon() {
    return `food${Math.floor(Math.random() * 2)}.png`;
}

class FoodService {

    constructor() {
        this.foodCoordinate = null;
        this.foodIcon = null;
    }

    reset() {
        this.foodCoordinate = getFoodCoordinate();
        this.foodIcon = getFoodIcon();
    }

    getFood() {
        if (!this.foodCoordinate) {
            this.foodCoordinate = getFoodCoordinate();
            this.foodIcon = getFoodIcon();
        }

        return {
            foodCoordinate: this.foodCoordinate,
            foodIcon: this.foodIcon
        };
    }

}

module.exports = FoodService;
