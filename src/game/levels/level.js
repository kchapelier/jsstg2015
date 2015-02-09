"use strict";

var rng = require('./../../lib/rng'),
    layout = require('./layout'),
    name = require('./name'),
    color = require('./color');

module.exports = {
    createFromString: function (string) {
        var levelRng = rng.createFromString(string),
            levelName = name.get(levelRng),
            levelLayout = layout.get(levelRng),
            levelColors = color.get(levelRng);

        return {
            rng: levelRng,
            name: levelName,
            layout: levelLayout,
            colors: levelColors
        };
    }
};
