"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [];

    for (var i = 0; i < 100; i++) {
        var tightness = 8 - Math.cos(2 + i * 0.5);
        def.push(['wait', 80]);
        //def.push(['randomBulletSprite', 'small-enemy-bullet-blue', 'small-enemy-bullet-yellow', 'small-enemy-bullet-red']);
        def.push(['rotate', 0.03]);
        def.push(['setBulletSpeed', 100 + 20 * Math.sin(0.3 * i)]);
        def.push(['burst', 10, Math.PI * 2, Math.sin(0.3 * i) / tightness, false]);
        def.push(['burst', 10, Math.PI * 2, Math.cos(0.3 * i) / tightness, false]);
    }

    return def;
};
