"use strict";

var PatternMetaData = function () {
    this.speed = 0;
    this.generosity = 0;
};

PatternMetaData.prototype.randomize = function (speedTendency, generosityTendency) {
    var speed = Math.random() * (speedTendency || 1),
        generosity = Math.random() * (generosityTendency || 1),
        sum = speed + generosity,
        ratio = 1 / sum;

    // normalizing
    this.speed = speed * ratio;
    this.generosity = generosity * ratio;

    return this;
};

module.exports = PatternMetaData;
