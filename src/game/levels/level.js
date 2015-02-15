"use strict";

var rng = require('./../../lib/rng'),
    layout = require('./layout'),
    name = require('./name'),
    color = require('./color'),
    tendency = require('./tendency'),
    patternMetaData = require('./patternMetaData');

var Level = function (rng) {
    this.rng = rng;

    this.name = name.get(rng);
    this.layout = layout.get(rng);
    this.colors = color.get(rng);
    this.tendencies = tendency.get(rng);
};

Level.prototype.rng = null;
Level.prototype.name = null;
Level.prototype.layout = null;
Level.prototype.colors = null;
Level.prototype.tendencies = null;

Level.prototype.generatePatternMetaData = function (difficulty) {
    return patternMetaData.get(this.rng, this.tendencies, difficulty);
};

module.exports = {
    createFromString: function (string) {
        var levelRng = rng.createFromString(string);

        return new Level(levelRng);
    }
};
