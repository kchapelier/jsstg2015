"use strict";

var meteorPool = require('./../../pools/meteorPool'),
    objectCollection = require('./../../objectCollection');

var MeteorField = function (level) {
    this.level = level;
    this.generosity = this.level.rng.randomBounded(0.5, 1.5);
    this.speed = this.level.rng.randomBounded(0.5, 1.5);
    this.duration = this.level.rng.randomBounded(0.5, 1.5);
    this.deviation = this.level.rng.randomBounded(-0.5, 0.5);
};

MeteorField.prototype.update = function (dt) {
    if (Math.random() < 0.005 * dt * this.generosity) {
        var size = 1 + Math.pow(Math.random(), 2) * 4;

        objectCollection.add('meteor', meteorPool.get({
            x: -100 + Math.random() * 1000,
            y: -200 + Math.random() * 100,
            speed: (200 + Math.random() * 150) * this.speed / Math.sqrt(size),
            size: size,
            colors: this.level.colors,
            directionIntent: {
                x: Math.random() * this.deviation,
                y: 1
            }
        }));
    }
};

module.exports = MeteorField;