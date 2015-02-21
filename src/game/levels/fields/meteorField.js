"use strict";

var meteorPool = require('./../../pools/meteorPool'),
    objectCollection = require('./../../objectCollection');

var MeteorField = function (level) {
    this.level = level;
    this.generosity = this.level.rng.randomBounded(0.5, 1.5);
    this.speed = this.level.rng.randomBounded(0.5, 1.75);
    this.duration = this.level.rng.randomBounded(1000, 2000);
    this.deviation = this.level.rng.randomBounded(-0.5, 0.5);
};

MeteorField.prototype.level = null;
MeteorField.prototype.generosity = null;
MeteorField.prototype.speed = null;
MeteorField.prototype.duration = null;
MeteorField.prototype.deviation = null;
MeteorField.prototype.internalTimer = null;

MeteorField.prototype.reset = function () {
    this.internalTimer = 0;
};

MeteorField.prototype.update = function (dt) {
    if (this.level.rng.random() < 0.005 * dt * this.generosity) {
        var size = 1 + Math.random() * 4;

        objectCollection.add('meteor', meteorPool.get({
            x: -100 + Math.random() * 1000,
            y: -200 + Math.random() * 100,
            speed: (450 + Math.random() * 200) * this.speed / Math.pow(size, 0.85),
            size: size,
            colors: this.level.colors,
            directionIntent: {
                x: Math.random() * this.deviation,
                y: 1
            }
        }));
    }

    this.internalTimer += dt;


    return (this.internalTimer < this.duration);
};

module.exports = MeteorField;
