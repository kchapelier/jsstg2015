"use strict";

var rng = require('./../../lib/rng'),
    layout = require('./layout'),
    name = require('./name'),
    color = require('./color'),
    tendency = require('./tendency'),
    patternMetaData = require('./patternMetaData');

var BossField = require('./fields/bossField'),
    BigEnemiesField = require('./fields/bigEnemiesField'),
    MeteorField = require('./fields/meteorField');

var Level = function (rng) {
    this.rng = rng;

    this.name = name.get(rng);
    this.layout = layout.get(rng);
    this.colors = color.get(rng);
    this.tendencies = tendency.get(rng);

    this.initializeFields();
};

Level.prototype.rng = null;
Level.prototype.name = null;
Level.prototype.layout = null;
Level.prototype.colors = null;
Level.prototype.tendencies = null;
Level.prototype.fields = null;

Level.prototype.initializeFields = function () {
    this.fields = [];

    for (var i = 0; i < this.layout.length; i++) {
        var type = this.layout[i];

        if (type === 'm') {
            this.fields.push(new MeteorField(this));
        } else if (type === 'E') {
            this.fields.push(new BigEnemiesField(this));
        } else if (type === 'B') {
            this.fields.push(new BossField(this));
        } else {
            throw new Error('Field type not implemented yet : "' + type + '"');
        }
    }
};

Level.prototype.generatePatternMetaData = function (difficulty) {
    return patternMetaData.get(this.rng, this.tendencies, difficulty);
};

module.exports = {
    createFromString: function (string) {
        var levelRng = rng.createFromString(string);

        return new Level(levelRng);
    }
};
