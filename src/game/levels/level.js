"use strict";

var rng = require('./../../lib/rng'),
    layout = require('./layout'),
    name = require('./name');

module.exports = {
    createFromString: function (string) {
        var levelRng = rng.createFromString(string),
            levelName = name.get(levelRng),
            levelLayout = layout.get(levelRng);

        return {
            rng: levelRng,
            name: levelName,
            layout: levelLayout
        };
    }
};
