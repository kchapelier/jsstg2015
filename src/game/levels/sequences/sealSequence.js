"use strict";

module.exports = function doubleRotatorFactory (rng, speed, generosity, difficulty) {
    var bulletSpeed = 50 + speed * 20,
        bulletNumber = Math.max(4, Math.min(5, Math.floor(3 + Math.sqrt(generosity) * 2))),
        waitTime = 130 / 70 * bulletSpeed + (bulletNumber - 4) * 18,
        spread = bulletNumber > 4 ? 1.33 : 1.5;

    var def = [];

    def.push(
        ['wait', 500],
        ['setAngle', Math.random() * 10, true]
    );

    var waitBetweenLayers = 2;

    for (var i = 0; i < 50; i++) {
        def.push(
            ['setBulletSpeed', bulletSpeed - i * 0.15, 0],
            ['wait', waitTime],
            ['setBulletSprite', 'enemy-bullet-combo'],
            ['burst', bulletNumber, Math.PI / spread, (i / 100) * Math.PI * 2, false],
            ['burst', bulletNumber, Math.PI / spread, (i / 100) * Math.PI * -2, false],
            ['burst', bulletNumber, Math.PI / spread, Math.PI + (i / 100) * Math.PI * 2, false],
            ['burst', bulletNumber, Math.PI / spread, Math.PI + (i / 100) * Math.PI * -2, false]
        );


        if (i >= waitBetweenLayers) {
            def.push(
                ['setBulletSprite', 'enemy-bullet-white'],
                ['burst', bulletNumber, Math.PI / spread, (i - waitBetweenLayers) / 100 * Math.PI * 2, false],
                ['burst', bulletNumber, Math.PI / spread, (i - waitBetweenLayers) / 100 * Math.PI * -2, false],
                ['burst', bulletNumber, Math.PI / spread, Math.PI + (i - waitBetweenLayers) / 100 * Math.PI * 2, false],
                ['burst', bulletNumber, Math.PI / spread, Math.PI + (i - waitBetweenLayers) / 100 * Math.PI * -2, false]
            );
        }
    }

    def.push(
        ['setBulletSprite', 'enemy-bullet-white'],
        ['wait', waitTime * 2.5],
        ['burst', 91, Math.PI * 2, 0, false],
        ['wait', waitTime * 1.1],
        ['burst', 91, Math.PI * 2, 0.01, false],
        ['wait', waitTime * 1.1],
        ['burst', 91, Math.PI * 2, 0.02, false],
        ['wait', waitTime * 1.1],
        ['burst', 91, Math.PI * 2, 0.03, false],
        ['wait', waitTime * 1.1],
        ['burst', 91, Math.PI * 2, 0.04, false],
        ['wait', waitTime * 1.1],
        ['burst', 91, Math.PI * 2, 0.05, false]
    );

    def.push(['wait', 1500]);

    return def;
};
