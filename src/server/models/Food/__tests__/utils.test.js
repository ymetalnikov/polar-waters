const { describe, it } = require('mocha');
const expect = require('chai').expect;
const { _generateFoodCoordinate } = require('../utils');

function* generateDiagonalSequence() {
    yield { x: 1, y: 1 };
    yield { x: 2, y: 2 };
    return { x: 3, y: 3 };
}

function* generateVerticalSequence() {
    yield { x: 1, y: 1 };
    yield { x: 1, y: 2 };
    yield { x: 1, y: 3 };
    return { x: 1, y: 4 };
}

describe('models/Food/utils _generateFoodCoordinate', function () {
    it('Should made offset on diagonal ', function () {
        let generator = generateDiagonalSequence();

        expect(_generateFoodCoordinate(
            () => (generator.next().value),
            [{ x: 1, y: 1 }]
        )).to.deep.include({ x: 3, y: 3 });
    });

    it('Should made offset on vertical', function () {
        let generator = generateVerticalSequence();

        expect(_generateFoodCoordinate(
            () => (generator.next().value),
            [{ x: 1, y: 1 }]
        )).to.deep.include({ x: 1, y: 3 });
    });
});
