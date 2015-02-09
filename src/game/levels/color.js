"use strict";

var chroma = require('chroma-js');

module.exports = {
    get: function (rng) {
        return {
            primary: chroma.hsv(rng.randomBounded(0, 360), 1, 0.8).hex(),
            secondary: chroma.hsv(rng.randomBounded(0, 360), 0.6, 0.5).hex()
        };
    }
};
