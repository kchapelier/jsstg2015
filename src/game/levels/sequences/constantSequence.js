"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var pgenerosity = 50 + 0.5 * 60;
    var pspeed = 10 + 0.5 * 80;
    var unstability = 0;

    var def = [];

    for (var i = 0; i < 100; i++) {
        def.push(
            ['wait', 600 * 40 / pspeed],
            ['setBulletSpeed', pspeed, unstability],
            ['burst', pgenerosity, Math.PI * 2, 0, false],
            ['wait', 600 * 40 / pspeed],
            ['setBulletSpeed', pspeed, unstability],
            ['burst', pgenerosity, Math.PI * 2, Math.PI / pgenerosity, false]
        );
    }

    return def;
};
