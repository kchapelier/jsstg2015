"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    /*
    var homing = rng() > 0.75,
        rotation = rng() * 10,
        number = Math.ceil((homing ? 1.5 * difficulty : 1) * 10 + generosity * 5) * 2 + 1,
        repeatition = Math.ceil(20 + generosity * difficulty),
        bulletSpeed = 120 * Math.pow(speed, 0.5),
        waitTime = 200 * 100 / bulletSpeed / Math.sqrt(difficulty);
    */

    var def = [];

    def.push(['setBulletSpeed', 50, 0]);

    def.push(['wait', 500]);
    def.push(['setAngle', 0, true]);
    def.push(['setBulletSprite', 'enemy-bullet-white']);
    def.push(['burst', 100, Math.PI * 2, 0, false]);
    def.push(['setBulletSprite', 'enemy-bullet-combo']);
    def.push(['wait', 200]);

    for (var i = 0; i < 50; i++) {
        def.push(['wait', 140]);
        def.push(['burst', 3, Math.PI / 2, (i / 100) * Math.PI * 2, false]);
        def.push(['burst', 3, Math.PI / 2, (i / 100) * Math.PI * -2, false]);
        def.push(['burst', 3, Math.PI / 2, Math.PI + (i / 100) * Math.PI * 2, false]);
        def.push(['burst', 3, Math.PI / 2, Math.PI + (i / 100) * Math.PI * -2, false]);
    }

    def.push(['wait', 1500]);

    return def;
};
