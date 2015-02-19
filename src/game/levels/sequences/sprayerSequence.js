"use strict";

var PI_2 = Math.PI / 2;

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [
        ['setBulletSpeed', 100]
    ];

    var d = 1;

    for (var i = 0; i < 200; i++) {
        def.push(['wait', 100]);
        def.push(['burst', 7, Math.PI * 2,  Math.PI * Math.sin((i >> d) / 10), false]);
        def.push(['burst', 7, Math.PI * 2,  Math.PI * 2 * Math.sin((i >> d) / 10), false]);
        def.push(['burst', 7, Math.PI * 2,  Math.PI * 4 / 3 * Math.sin((i >> d) / 10), false]);
    }

    return def;
};
