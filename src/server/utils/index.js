const { TILE_COUNT } = require('../../share/constants');

function getRandom() {
    const randomNumber = Math.random().toString();
    return randomNumber.substring(2, randomNumber.length);
}

/**
 * @param reduceCount
 * @returns {number}
 */
function randomTileOnField(reduceCount = 0) {
    return Math.floor(Math.random() * (TILE_COUNT - reduceCount));
}

/**
 * @param hue range: [0, 360)
 * @param saturation range: [0, 1]
 * @param lightness range: [0, 1]
 * @returns {[Number, Number, Number]}
 */
const hslToRgb = (hue, saturation, lightness) => {

    const chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
    let huePrime = hue / 60;
    const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

    huePrime = Math.floor(huePrime);
    let red;
    let green;
    let blue;

    if (huePrime === 0) {
        red = chroma;
        green = secondComponent;
        blue = 0;
    } else if (huePrime === 1) {
        red = secondComponent;
        green = chroma;
        blue = 0;
    } else if (huePrime === 2) {
        red = 0;
        green = chroma;
        blue = secondComponent;
    } else if (huePrime === 3) {
        red = 0;
        green = secondComponent;
        blue = chroma;
    } else if (huePrime === 4) {
        red = secondComponent;
        green = 0;
        blue = chroma;
    } else if (huePrime === 5) {
        red = chroma;
        green = 0;
        blue = secondComponent;
    }

    let lightnessAdjustment = lightness - (chroma / 2);
    red += lightnessAdjustment;
    green += lightnessAdjustment;
    blue += lightnessAdjustment;

    return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];

};

/**
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomArbitary(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @returns {string}
 */
function makeRandomColor() {
    const hue = getRandomArbitary(0, 355);
    let rgbArray = hslToRgb(hue, 0.5, 0.5);

    rgbArray = rgbArray.map(item => (Math.floor(item)));

    return `rgb(${rgbArray})`;
}

module.exports = {
    randomTileOnField,
    getRandom,
    makeRandomColor
};
