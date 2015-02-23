"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var pgenerosity = 50 + generosity * 60,
        pspeed = 50 + speed * 20,
        unstability = 0;

    var def = [
        ['wait', 300]
    ];

    for (var i = 0; i < 40; i++) {
        unstability += 0.125;
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
