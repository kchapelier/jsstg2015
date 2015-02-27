"use strict";

var sequenceGenerator = require('./../sequences/generator'),
    bigMonsterPool = require('./../../pools/bigEnemyPool'),
    objectCollection = require('./../../objectCollection');

var monsterArray = objectCollection.getArray('enemy');

var screenWidth = 800,
    screenHeight = 600;

//crown2 is bad

var patterns = {
    constant: 0.8,
    serpentineFlower: 1,
    seal: 1,
    flower: 1,
    crown: 0.8
};

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
        sequence = this.generateSequence(patterns, difficulty);

    this.enemies.push({
        x: x,
        y: y,
        sequence: sequence
    });
};

BossField.prototype.reset = function () {
    this.internalTimer = 0;
    this.spawned = false;
};

BossField.prototype.update = function (dt) {
    if (!this.spawned && this.internalTimer > 2750) {
        for (var i = 0; i < this.enemies.length; i += 1) {
            var pos = this.enemies[i];

            pos.explosionSize = 4.5;
            pos.explosionColors = this.level.colors;
            pos.totalLife = 50;
            pos.displayLifeBar = true;

            objectCollection.add('enemy', bigMonsterPool.get(pos));
        }

        this.spawned = true;
    }

    this.internalTimer += dt;

    return !(this.spawned && monsterArray.length === 0);
};

module.exports = BossField;
