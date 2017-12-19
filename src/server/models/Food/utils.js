const { randomTileOnField } = require('../../utils');

// Так как еда занимает 2x2, уменьшаем поле.
const REDUCE_FOOD_AREA = 1;

function getFoodCoordinate() {
    return {
        x: randomTileOnField(REDUCE_FOOD_AREA),
        y: randomTileOnField(REDUCE_FOOD_AREA),
    };
}

/**
 * Пример оптимизации работы v8.2.0
 * Игра из 3х змей
 * generateFoodCoordinate: 0.278ms
 * generateFoodCoordinate: 0.097ms
 * generateFoodCoordinate: 0.072ms
 * generateFoodCoordinate: 0.026ms
 * */
function _generateFoodCoordinate(getFoodCoordinate, occupiedCells) {
    let isFree = false;
    let foodCoordinate;
    const neighborsOffset = [-2, -1, 0, 1, -2];

    while (!isFree) {
        foodCoordinate = getFoodCoordinate();
        isFree = !occupiedCells.length
            || !occupiedCells.some(
                (position) => (neighborsOffset.some(
                    (offsetX) => (neighborsOffset.some(
                        (offsetY) => (foodCoordinate.x === (position.x + offsetX)
                            && foodCoordinate.y === (position.y + offsetY))
                    )))));
    }

    return foodCoordinate;
}

const generateFoodCoordinate = (occupiedCells) => (
    _generateFoodCoordinate(getFoodCoordinate, occupiedCells));

function getFoodIcon() {
    return `food${Math.floor(Math.random() * 2)}.png`;
}

module.exports = {
    _generateFoodCoordinate,
    generateFoodCoordinate,
    getFoodCoordinate,
    getFoodIcon
};