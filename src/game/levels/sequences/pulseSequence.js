"use strict";

var Sequence = require('../../patterns/sequence');

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {


    var homing = rng() > 0.6,
        rotation = rng() * 10,
        number = Math.ceil(10 + 20 * generosity) * 2 + 1,
        bulletSpeed = 180 * speed,
        waitTime = Math.min(1600, 800 * (1 + generosity / 10) / Math.sqrt(speed));

    /*

        rotation = rng() * 10,
        number = Math.ceil((homing ? 1.5 * difficulty : 1) * 10 + generosity * 5) * 2 + 1,
        repeatition = Math.ceil(20 + generosity * difficulty),
        bulletSpeed = 120 * Math.pow(speed, 0.5),
        waitTime = 200 * 100 / bulletSpeed / Math.sqrt(difficulty);
    */

    var def = [];

    def.push(['setBulletSpeed', bulletSpeed, 0]);
    def.push(['setBulletSprite', 'player-bullet']);

    for (var i = 0; i < 50; i++) {
        def.push(['wait', waitTime]);

        if (homing) {
            def.push(['setAngle', 0, true]);
        } else {
            def.push(['rotate', rotation, false]);
        }

        def.push(['burst', number, Math.PI * 2, 0, false]);
    }

    return new Sequence(def, 20);
};
