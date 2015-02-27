"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [];

    def.push(['wait', 400]);

    def.push(['setAngle', -1, true]);
    def.push(['setBulletSpeed', 50, 0]);
    def.push(['setBulletSprite', 'enemy-bullet-black']);

    for (var i = 0; i < 50; i++) {
        def.push(['wait', 100]);
        def.push(['rotate', 0.2, false]);
        def.push(['setBulletSpeed', 50 + 2 * Math.sqrt(i)]);
        def.push(['burst', 5, Math.PI / 8, 0, false]);
        def.push(['burst', 5, Math.PI / 8, Math.PI, false]);
    }

    return def;
};
