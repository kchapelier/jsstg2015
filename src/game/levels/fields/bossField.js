"use strict";

var sequenceGenerator = require('./../sequences/generator');

var bigMonsterPool = require('./../../pools/bigEnemyPool'),
    objectCollection = require('./../../objectCollection');

var screenWidth = 800,
    screenHeight = 600;

var BossField = function (level) {
    this.level = level;
    this.enemies = [];

    this.initializeBossOnTop();
    this.reset();
};

BossField.prototype.level = null;
BossField.prototype.enemies = null;
BossField.prototype.spawned = null;

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

BossField.prototype.reset = function () {
    this.spawned = false;
};

BossField.prototype.update = function (dt) {
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

module.exports = BossField;
