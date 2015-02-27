"use strict";

var scale = require('mathp/functions/scale');

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var def = [];

    var bulletNumber = Math.floor(7 + generosity * 6),
        generalTightness = scale(generosity, 0.8, 1.5, 8, 50),
        bulletSpeed = 60 + 40 * speed,
        waitTime = 0.9 * bulletSpeed;

    def.push(['setAngle', Math.random() * 10]);

    for (var i = 3; i < 108; i++) {
        var tightness = generalTightness - Math.cos(2 + i * 0.5);
        def.push(
            ['wait', waitTime],
            ['rotate', 0.03],
            ['setBulletSpeed', bulletSpeed + bulletSpeed / 5 * Math.sin(0.3 * i)],
            ['setBulletSprite', 'enemy-bullet-combo'],
            ['burst', bulletNumber, Math.PI * 2, Math.sin(0.3 * i) / tightness, false],
            ['setBulletSprite', 'enemy-bullet-white'],
            ['burst', bulletNumber, Math.PI * 2, Math.cos(0.3 * i) / tightness, false]
        );
    }

    def.push(['wait', 1000]);

    return def;
};
