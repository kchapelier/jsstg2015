"use strict";

var chroma = require('chroma-js');

module.exports = {
    get: function (rng) {
        return {
            primary: chroma.hsv(rng.randomBounded(0, 360), 1, rng.randomBounded(0.8, 1)).hex(),
            secondary: chroma.hsv(rng.randomBounded(0, 360), rng.randomBounded(0.7, 0.85), rng.randomBounded(0.2, 0.45)).hex()
        };
    }
};
