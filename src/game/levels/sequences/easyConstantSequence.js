"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var pgenerosity = 35 + generosity * 30,
        repeatitions = 30 + generosity * 20,
        pspeed = 40 + speed * 30,
        waitTime = 1100 * 40 / pspeed;

    var def = [];

    for (var i = 0; i < repeatitions; i++) {
        def.push(
            ['wait', waitTime],
            ['setBulletSpeed', pspeed],
            ['burst', pgenerosity, Math.PI * 2, 0, false],
            ['wait', waitTime],
            ['setBulletSpeed', pspeed],
            ['burst', pgenerosity, Math.PI * 2, Math.PI / pgenerosity, false]
        );
    }

    return def;
};
