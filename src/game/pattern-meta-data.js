"use strict";

var PatternMetaData = function (rng) {
    this.speed = 0;
    this.generosity = 0;
    this.rng = rng || Math.random;
};

PatternMetaData.prototype.randomize = function (speedTendency, generosityTendency) {
    var speed = this.rng() * (speedTendency || 1),
        generosity = this.rng() * (generosityTendency || 1),
        sum = speed + generosity,
        ratio = 1 / sum;

    // normalizing
    this.speed = speed * ratio;
    this.generosity = generosity * ratio;

    return this;
};

module.exports = PatternMetaData;
