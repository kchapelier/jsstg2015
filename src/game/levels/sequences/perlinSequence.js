"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var startX = rng.random() * 100,
        startY = rng.random() * 100;

    var def = [];

    def.push(['setBulletSpeed', 40, 0]);
    def.push(['setBulletSprite', 'player-bullet']);

    for (var i = 0; i < 30; i++) {
        def.push(['wait', 140]);
        def.push(['setAngle', Math.PI * 2 * rng.simplex2(startX + i / 150, startY + i / 81), false]);
        def.push(['burst', 5, Math.PI * 2, 0, false]);
        def.push(['rotate', 0.05]);
        def.push(['wait', 40]);
        def.push(['burst', 5, Math.PI * 2, 0, false]);
    }

    return def;
};
