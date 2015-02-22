"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    speed = 0.15 + speed * 0.8;

    var homing = rng.random() > 0.6,
        rotation = rng.random() * 10,
        number = Math.ceil(10 + 20 * generosity) * 2 + 1,
        bulletSpeed = 180 * speed,
        waitTime = Math.min(1600, 800 * (1 + generosity / 10) / Math.sqrt(speed));

    var def = [];

    def.push(
        ['setBulletSpeed', bulletSpeed, 0],
        ['setBulletSprite', 'player-bullet']
    );

    for (var i = 0; i < 5; i++) {
        def.push(['wait', waitTime]);

        if (homing) {
            def.push(['setAngle', 0, true]);
        } else {
            def.push(['rotate', rotation, false]);
        }

        def.push(['burst', number, Math.PI * 2, 0, false]);
    }

    return def;
};
