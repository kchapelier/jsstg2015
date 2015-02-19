"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var PI_2 = Math.PI / 2;

    var def = [
        ['wait', 1000],
        ['setBulletSpeed', 50]
    ];

    for (var i = 0; i < 200; i++) {
        def.push(['wait', 240]);
        def.push(['burst', 15, Math.PI * 2, PI_2 * Math.sin(PI_2 * i / 100) * Math.cos(2 + (PI_2 * i) / 20), false]);
        def.push(['burst', 15, Math.PI * 2, -PI_2 * Math.sin(PI_2 * i / 100) * Math.cos(2 + (PI_2 * i) / 20), false]);
    }

    return def;
};
