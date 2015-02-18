"use strict";

var sequenceGenerator = require('./../sequences/generator');

var screenWidth = 800,
    screenHeight = 600;

var BossField = function (level) {
    this.level = level;
    this.enemies = [];

    this.initializeBossOnTop();
};

BossField.prototype.generateSequence = function (preferences, difficulty) {
    return sequenceGenerator.generateSequence(this.level.rng, this.level.generatePatternMetaData(difficulty + 3), preferences);
};

BossField.prototype.initializeBossOnTop = function () {
    var difficulty = 1;

    var x = (screenWidth / 2) | 0,
        y = (screenHeight / 8) | 0,
        sequence = this.generateSequence({
            square: 1,
            test: 1
        }, difficulty);

    this.enemies.push({
        x: x,
        y: y,
        sequence: sequence
    });
};

module.exports = BossField;
