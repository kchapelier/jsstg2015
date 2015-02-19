"use strict";

var PI_2 = Math.PI / 2;

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [
        ['setBulletSpeed', 100]
    ];

    for (var i = 0; i < 20; i++) {
        console.log((i % 3) / 20);

        def.push(['wait', 250]);
        def.push(['setBulletSpeed', 50 + (i % 5) * 3]);
        def.push(['burst', 13, Math.PI * 2, i / 8 + Math.PI * 3 * Math.sin((i % 5) / 20), false]);
        def.push(['burst', 13, Math.PI * 2, i / 8 + Math.PI * 3 * Math.sin((i % 5) / 20), false]);
    }

    return def;
};
