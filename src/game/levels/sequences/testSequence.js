"use strict";

var Sequence = require('../../patterns/sequence');

module.exports = function tesSequenceFactory (rng, speed, generosity, difficulty) {
    var number = Math.ceil(10 + generosity * 5) * 2 + 1,
        repeatition = Math.ceil(20 + generosity * difficulty),
        bulletSpeed = 120 * Math.pow(speed, 0.75),
        waitTime = 200 * 100 / bulletSpeed / difficulty;

    var mustRotate = rng() > 0.5,
        rotation = rng() * 10;

    var def = [];

    def.push(['wait', waitTime]);
    def.push(['setBulletSprite', 'player-bullet']);
    def.push(['setBulletSpeed', bulletSpeed]);

    if (mustRotate) {
        def.push(['rotate', rotation]);
    } else {
        def.push(['setAngle', 0, true]);
    }

    def.push(['burst', number, Math.PI * 2, 0, false]);

    return new Sequence(def, repeatition);

    /*
    Original template
    return new Sequence([
        ['wait', 180],
        ['setBulletSprite', 'player-bullet'],
        ['setBulletSpeed', 100],
        ['setAngle', 0, true],
        ['burst', number, Math.PI * 2, 0, false]
    ], 20);
    */
};
