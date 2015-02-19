"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var number = 30;
    var def = [
        ['wait',  100],
        ['rotate', 0.05],
        ['setBulletSpeed', 100]
    ];

    for (var i = 0; i < number; i++) {
        def.push(['wait',  40]);
        def.push(['burst', 20, Math.PI * 2, 0.05 * i, false]);
    }

    return def;
};
