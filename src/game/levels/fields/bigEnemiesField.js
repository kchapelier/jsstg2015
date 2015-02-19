"use strict";

// TODO move out (+ enemy constraint)

var sequenceGenerator = require('./../sequences/generator');

var bigMonsterPool = require('./../../pools/bigEnemyPool'),
    objectCollection = require('./../../objectCollection');

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

    this.reset();
};

BigEnemiesField.prototype.level = null;
BigEnemiesField.prototype.enemies = null;
BigEnemiesField.prototype.spawned = null;

BigEnemiesField.prototype.generateSequence = function (preferences, difficulty) {
    return sequenceGenerator.generateSequence(this.level.rng, this.level.generatePatternMetaData(difficulty), preferences);
};

BigEnemiesField.prototype.initializeTwoMonstersOnTop = function () {
    var difficulty = 1;

    var x = this.level.rng.randomBounded(widthDiv10, widthDiv10 * 4) | 0,
        y = this.level.rng.randomBounded(heightDiv10, heightDiv10 * 4) | 0,
        sequence = this.generateSequence({
            square: 1
        }, difficulty);

    this.enemies.push({
        x: x,
        y: y,
        sequence: sequence
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y,
        sequence: sequence.clone()
    });
};

BigEnemiesField.prototype.initializeThreeMonstersOnTop = function () {
    var difficulty = 1;

    var edgeDifficuly = difficulty * 0.90;

    var x = this.level.rng.randomBounded(widthDiv10 * 2, widthDiv10 * 4) | 0,
        y = this.level.rng.randomBounded(heightDiv10 * 2, heightDiv10 * 3) | 0,
        y3 = y + (this.level.rng.randomBounded(heightDiv10, heightDiv10 * 1.5) | 0) * (this.level.rng.random() > 0.5 ? -1 : 1),
        sequence = this.generateSequence({
            square: 1
        }, edgeDifficuly),
        sequence3 = this.generateSequence({
            square: 1
        }, difficulty);

    this.enemies.push({
        x: screenWidth / 2,
        y: y3,
        sequence: sequence3
    });

    this.enemies.push({
        x: x,
        y: y,
        sequence: sequence
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y,
        sequence: sequence.clone()
    });
};

BigEnemiesField.prototype.initializeFourMonstersInCorners = function () {
    var difficulty = 1;

    // reduce pattern difficulty proportionnally to x

    var x = this.level.rng.randomBounded(widthDiv10 * 0.5, widthDiv10 * 2) | 0,
        y = (x * screenHeight / screenWidth) | 0,
        sequenceDifficulty = difficulty * (0.90 - x / screenWidth),
        sequence = this.generateSequence({
            square: 1
        }, sequenceDifficulty);

    this.enemies.push({
        x: x,
        y: y,
        sequence: sequence
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y,
        sequence: sequence.clone()
    });

    this.enemies.push({
        x: x,
        y: screenHeight - y,
        sequence: sequence.clone()
    });

    this.enemies.push({
        x: screenWidth - x,
        y: screenHeight - y,
        sequence: sequence.clone()
    });
};

BigEnemiesField.prototype.initializeTwoMonstersAtEdges = function () {
    var difficulty = 1;

    var x = this.level.rng.randomBounded(widthDiv10 * 0.5, widthDiv10 * 1.5) | 0,
        y = this.level.rng.randomBounded(heightDiv10 * 4, heightDiv10 * 5) | 0,
        sequence = this.generateSequence({
            square: 1
        }, difficulty);

    this.enemies.push({
        x: x,
        y: y,
        sequence: sequence
    });

    this.enemies.push({
        x: screenWidth - x,
        y: y,
        sequence: sequence.clone()
    });
};

BigEnemiesField.prototype.reset = function () {
    this.spawned = false;
};

BigEnemiesField.prototype.update = function (dt) {
    if (!this.spawned) {
        for (var i = 0; i < this.enemies.length; i += 1) {
            var pos = this.enemies[i];

            objectCollection.add('enemy', bigMonsterPool.get({
                x: pos.x,
                y: pos.y,
                speed: 0,
                directionIntent: {
                    x: 0,
                    y: 0
                },
                sequence: pos.sequence
            }));
        }

        this.spawned = true;
    }
};

module.exports = BigEnemiesField;
