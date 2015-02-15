"use strict";

module.exports = {
    get: function (rng) {
        return {
            speed: rng.randomBounded(0.5, 4),
            generosity: rng.randomBounded(0.5, 4),
            difficulty: rng.randomBounded(0.75, 1.25)
        };
    }
};
