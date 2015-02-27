"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var pgenerosity = 70 + generosity * 40,
        pspeed = 50 + speed * 20,
        unstability = 0;

    var def = [
        ['wait', 300]
    ];

    for (var i = 0; i < 30; i++) {
        unstability += 0.15;
        def.push(
            ['wait', 600 * 40 / pspeed],
            ['setBulletSprite', 'enemy-bullet-black'],
            ['setBulletSpeed', pspeed, unstability],
            ['burst', pgenerosity, Math.PI * 2, 0, false],
            ['wait', 600 * 40 / pspeed],
            ['setBulletSprite', 'enemy-bullet-combo2'],
            ['setBulletSpeed', pspeed, unstability],
            ['burst', pgenerosity, Math.PI * 2, Math.PI / pgenerosity, false]
        );
    }

    def.push(['wait', 1000]);

    return def;
};
