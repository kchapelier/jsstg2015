"use strict";

var chroma = require('chroma-js');

module.exports = {
    get: function (rng) {
        return {
            primary: chroma.hsv(rng.randomBounded(0, 360), 1, 1).hex(),
            secondary: chroma.hsv(rng.randomBounded(0, 360), 0.83, 0.48).hex()
        };
    }
};
