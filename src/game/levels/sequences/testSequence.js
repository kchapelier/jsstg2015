"use strict";

module.exports = function tesSequenceFactory (rng, speed, generosity, difficulty) {
    var homing = rng.random() > 0.75,
        rotation = rng.random() * 10,
        number = Math.ceil((homing ? 1.5 * difficulty : 1) * 10 + generosity * 5) * 2 + 1,
        repeatition = Math.ceil(20 + generosity * difficulty),
        bulletSpeed = 120 * Math.pow(speed, 0.5),
        waitTime = 200 * 100 / bulletSpeed / Math.sqrt(difficulty);

    var def = [];

    def.push(['wait', waitTime]);
    def.push(['setBulletSprite', 'player-bullet']);
    def.push(['setBulletSpeed', bulletSpeed]);

    if (homing) {
        def.push(['setAngle', 0, true]);
    } else {
        def.push(['rotate', rotation]);
    }

    def.push(['burst', number, Math.PI * 2, 0, false]);

    return def;

    /*
    Original template
    return new Sequence([
        ['wait', 180],
        ['setBulletSprite', 'player-bullet'],
        ['setBulletSpeed', 100],
        ['setAngle', 0, true],
        ['burst', number, Math.PI * 2, 0, false]
    ], 20);
    */
};
