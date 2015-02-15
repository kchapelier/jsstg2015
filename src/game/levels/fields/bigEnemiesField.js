"use strict";

var screenWidth = 800,
    screenHeight = 600,
    widthDiv10 = screenWidth / 10,
    heightDiv10 = screenHeight / 10;

var BigEnemiesField = function (level) {
    this.level = level;
    this.enemies = [];

    var choice = this.level.rng.random();

    if (choice > 0.60) {
        this.initializeTwoMonstersOnTop();
    } else if (choice > 0.25) {
        this.initializeThreeMonstersOnTop();
    } else if (choice > 0.10) {
        this.initializeTwoMonstersAtEdges();
    } else {
        this.initializeFourMonstersInCorners();
    }
};

BigEnemiesField.prototype.initializeTwoMonstersOnTop = function () {
    var x = this.level.rng.randomBounded(widthDiv10, widthDiv10 * 4) | 0,
        y = this.level.rng.randomBounded(heightDiv10, heightDiv10 * 4) | 0;

    this.enemies.push({
        x: x,
        y: y
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y
    });

    //TODO chose randomly whether the two enemies should have the same pattern
};

BigEnemiesField.prototype.initializeThreeMonstersOnTop = function () {
    var x = this.level.rng.randomBounded(widthDiv10 * 2, widthDiv10 * 4) | 0,
        y = this.level.rng.randomBounded(heightDiv10 * 2, heightDiv10 * 3) | 0,
        y3 = y + (this.level.rng.randomBounded(heightDiv10, heightDiv10 * 1.5) | 0) * (this.level.rng.random() > 0.5 ? -1 : 1);

    this.enemies.push({
        x: screenWidth / 2,
        y: y3
    });

    this.enemies.push({
        x: x,
        y: y
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y
    });

    //TODO lower the difficulty of the two edge monsters
    //TODO have the two edges monsters use a different pattern than the middle one
};

BigEnemiesField.prototype.initializeFourMonstersInCorners = function () {
    var x = this.level.rng.randomBounded(widthDiv10 * 0.5, widthDiv10 * 2) | 0,
        y = (x * screenHeight / screenWidth) | 0;

    this.enemies.push({
        x: x,
        y: y
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y
    });

    this.enemies.push({
        x: x,
        y: screenHeight - y
    });

    this.enemies.push({
        x: screenWidth - x,
        y: screenHeight - y
    });

    //TODO reduce pattern difficulty proportionnally to x
    //TODO reduce the speed of the patterns
};

BigEnemiesField.prototype.initializeTwoMonstersAtEdges = function () {
    var x = this.level.rng.randomBounded(widthDiv10 * 0.5, widthDiv10 * 1.5),
        y = this.level.rng.randomBounded(heightDiv10 * 4, heightDiv10 * 5);

    this.enemies.push({
        x: x,
        y: y
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y
    });

    //TODO have the two enemies have the same patterns
};

module.exports = BigEnemiesField;
