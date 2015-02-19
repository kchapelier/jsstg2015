"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [
        ['wait', 100],
        ['setBulletSpeed', 60]
    ];

    for (var i = 0; i < 200; i++) {
        def.push(['wait', 220]);
        def.push(['setBulletSpeed', 50]);
        def.push(['burst', 10, i / 10 + Math.PI * 2 * Math.sin(i / 24), 0, false]);
        def.push(['burst', 10, i / 10 + Math.PI * 2 * Math.sin(i / 24), Math.PI, false]);
    }

    return def;
};
