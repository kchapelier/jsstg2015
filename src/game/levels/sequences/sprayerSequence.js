"use strict";

var PI_2 = Math.PI / 2;

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var bulletSpeed = 90 + speed * 30,
        waitTime = 140 / 100 * bulletSpeed,
        bulletNumber = 6 + Math.ceil(generosity * 2);

    var def = [
        ['setBulletSpeed', bulletSpeed],
        ['setBulletSprite', 'enemy-bullet-combo']
    ];

    var d = 1;

    for (var i = 0; i < 60; i++) {
        def.push(['wait', 140 / 100 * bulletSpeed]);
        def.push(['burst', bulletNumber, Math.PI * 2,  Math.PI * Math.sin((i >> d) / 10), false]);
        def.push(['burst', bulletNumber, Math.PI * 2,  Math.PI * 2 * Math.sin((i >> d) / 10), false]);
        def.push(['burst', bulletNumber, Math.PI * 2,  Math.PI * 4 / 3 * Math.sin((i >> d) / 10), false]);
    }

    return def;
};
