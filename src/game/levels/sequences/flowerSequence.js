"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var PI_2 = Math.PI / 2;

    var dev = rng.randomBounded(90, 120),
        dev2 = rng.randomBounded(5, 20);

    var bulletNumber = 12 + 6 * generosity,
        bulletSpeed = 40 + speed * 10,
        waitTime = 360 * 50 / bulletSpeed + generosity * 5;

    var def = [
        ['setBulletSpeed', 50]
    ];

    for (var i = 0; i <= 87; i++) {
        var forceWhite = (i ===  0 || i === 87);
        def.push(['wait', waitTime]);
        def.push(['setBulletSprite', (forceWhite ? 'enemy-bullet-white' : 'enemy-bullet-combo2')]);
        def.push(['burst', bulletNumber, Math.PI * 2, PI_2 * Math.sin(PI_2 * i / dev) * Math.cos(2.1 + (PI_2 * i) / dev2), false]);
        def.push(['burst', bulletNumber, Math.PI * 2, -PI_2 * Math.sin(PI_2 * i / dev) * Math.cos(2.1 + (PI_2 * i) / dev2), false]);

        if (i > 4) {
            def.push(['setBulletSprite', (forceWhite ? 'enemy-bullet-white' : 'enemy-bullet-black')]);
            def.push(['burst', bulletNumber, Math.PI * 2, 0.1 + PI_2 * Math.sin(PI_2 * i / dev) * Math.cos(2.13 + (PI_2 * i) / dev2), false]);
            def.push(['burst', bulletNumber, Math.PI * 2, -0.1 + -PI_2 * Math.sin(PI_2 * i / dev) * Math.cos(2.13 + (PI_2 * i) / dev2), false]);
        }
    }

    def.push(
        ['wait', 4000]
    );

    return def;
};
