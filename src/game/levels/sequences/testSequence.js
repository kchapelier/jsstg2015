"use strict";

module.exports = function tesSequenceFactory (rng, speed, generosity, difficulty) {
    var rotation = 0.5, //rng.random() * 10,
        number = Math.ceil(9 + generosity * 5) * 2,
        repeatition = Math.ceil(10 + generosity * difficulty),
        bulletSpeed = 90 * Math.pow(speed, 0.25),
        waitTime = 280 * 100 / bulletSpeed / Math.sqrt(difficulty);

    var def = [];


    def.push(
        ['setBulletSprite', 'player-bullet'],
        ['setBulletSpeed', bulletSpeed]
    );

    for (var i = 0; i < repeatition; i++) {
        def.push(
            ['wait', waitTime],
            ['rotate', rotation],
            ['burst', number, Math.PI * 2, 0, false]
        );
    }

    return def;

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
