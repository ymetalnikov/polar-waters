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

module.exports = {
    getFoodCoordinate,
    getFoodIcon
};