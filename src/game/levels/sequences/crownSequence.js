"use strict";

var PI_2 = Math.PI / 2;

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var bulletNumber = 10 + generosity * 6,
        bulletSpeed = 50 + 16 * speed,
        waitingTime = 420 / bulletSpeed * 60;

    var dev = 70;

    var def = [
        ['setBulletSpeed', bulletSpeed],
        ['setAngle', PI_2 * ((Math.random() * 4) | 0)]
    ];

    for (var i = 0; i <= dev * 2; i++) {
        def.push(
            ['wait', waitingTime],
            ['setBulletSprite', 'enemy-bullet-black'],
            ['burst', bulletNumber, Math.PI * 2 * Math.sin(PI_2 * i / dev), PI_2, false],
            ['burst', bulletNumber, Math.PI * 2 * Math.sin(PI_2 * i / dev), PI_2 * 3, false],
            ['setBulletSprite', 'enemy-bullet-white'],
            ['burst', bulletNumber, Math.PI * 2 * Math.sin(PI_2 * i / dev), PI_2 * 2, false],
            ['burst', bulletNumber, Math.PI * 2 * Math.sin(PI_2 * i / dev), PI_2 * 4, false]
        );
    }

    def.push(['wait', 3000]);

    return def;
};
