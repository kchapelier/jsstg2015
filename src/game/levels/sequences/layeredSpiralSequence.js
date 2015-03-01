"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var bulletSpeed = 45 + 10 * speed,
        waitTime = 250 / 50 * bulletSpeed,
        div = Math.round(rng.randomBounded(4, 7)),
        repeatitions = Math.round(generosity * 3.5) * div;

    var def = [
        ['wait', 100],
        ['setBulletSprite', 'enemy-bullet-black']
    ];

    for (var i = 0; i < repeatitions; i++) {
        def.push(
            ['wait', waitTime],
            ['setBulletSpeed', bulletSpeed + (i % div) * 3],
            ['burst', 13, Math.PI * 2, i / 8 + Math.PI * 3 * Math.sin((i % div) / 20), false],
            ['burst', 13, Math.PI * 2, i / 8 + Math.PI * 3 * Math.sin((i % div) / 20), false]
        );
    }

    return def;
};
