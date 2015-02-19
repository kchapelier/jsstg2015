"use strict";

var PI_2 = Math.PI / 2;

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [
        ['wait', 1000],
        ['setBulletSpeed', 50]
    ];

    for (var i = 0; i < 200; i++) {
        def.push(['wait', 260]);
        def.push(['burst', 6, Math.PI * 2 * Math.sin(PI_2 * i / 120), PI_2, false]);
        def.push(['burst', 6, Math.PI * 2 * Math.sin(PI_2 * i / 120), PI_2 * 2, false]);

        def.push(['burst', 6, Math.PI * 2 * Math.sin(PI_2 * i / 120), PI_2 * 3, false]);
        def.push(['burst', 6, Math.PI * 2 * Math.sin(PI_2 * i / 120), PI_2 * 4, false]);

    }

    return def;
};
