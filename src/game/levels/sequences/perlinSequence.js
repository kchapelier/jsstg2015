"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var bulletNumber = Math.min(6, Math.max(4, Math.ceil(6 * (generosity + 0.2)))),
        bulletSpeed = 45 + 25 * speed;

    var startX = rng.random() * 100,
        startY = rng.random() * 100;

    var def = [];

    def.push(['setBulletSpeed', bulletSpeed, 0]);
    def.push(['setBulletSprite', 'enemy-bullet-black']);

    for (var i = 0; i < 30; i++) {
        def.push(
            ['wait', 140],
            ['setAngle', Math.PI * 2 * rng.simplex2(startX + i / 150, startY + i / 81), false],
            ['burst', bulletNumber, Math.PI * 2, 0, false],
            ['rotate', 0.05],
            ['wait', 40],
            ['burst', bulletNumber, Math.PI * 2, 0, false]
        );
    }

    return def;
};
