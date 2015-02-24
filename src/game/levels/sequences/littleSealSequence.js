"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var bulletSpeed = 40 + speed * 30,
        bulletNumber = Math.max(2, Math.min(4, Math.floor(2 + Math.sqrt(generosity) * 2))),
        waitTime = 100 / 70 * bulletSpeed + 15 * (bulletNumber - 2),
        spread = 1.5;

    var def = [];

    def.push(
        ['setBulletSpeed', bulletSpeed + 10, 0],
        ['wait', waitTime * 5],
        ['setAngle', 0, true],
        ['setBulletSprite', 'enemy-bullet-white'],
        ['burst', 60, Math.PI * 2, 0, false],
        ['setBulletSprite', 'enemy-bullet-black'],
        ['wait', waitTime * 2]
    );

    for (var i = 0; i < 15; i++) {
        def.push(['setBulletSpeed', bulletSpeed - i * 1.5 / 70 * bulletSpeed, 0]);
        def.push(['wait', waitTime]);
        def.push(['burst', bulletNumber, Math.PI / spread, (i / 80) * Math.PI * 2, false]);
        def.push(['burst', bulletNumber, Math.PI / spread, (i / 80) * Math.PI * -2, false]);
        def.push(['burst', bulletNumber, Math.PI / spread, Math.PI + (i / 80) * Math.PI * 2, false]);
        def.push(['burst', bulletNumber, Math.PI / spread, Math.PI + (i / 80) * Math.PI * -2, false]);
    }

    def.push(['wait', 3500]);

    return def;
};
