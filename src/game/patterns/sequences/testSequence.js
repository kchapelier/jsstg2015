"use strict";

var Sequence = require('../sequence');

module.exports = function tesSequenceFactory () {
    return new Sequence([
        ['wait', 180],
        ['setBulletSprite', 'player-bullet'],
        ['setBulletSpeed', 100],
        ['setAngle', 0, true],
        ['burst', 31, Math.PI * 2, 0, false]
    ], 20);
};
