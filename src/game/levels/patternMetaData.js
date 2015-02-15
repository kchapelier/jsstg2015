"use strict";

var generateMetaData = function generateMetaData (rng, speedTendency, generosityTendency, difficulty) {
    var difficultyFactor = Math.max(1, Math.pow(difficulty, 1 / 3)),
        speed = rng() * speedTendency,
        generosity = rng() * generosityTendency,
        sum = speed + generosity,
        ratio = 1 / sum;

    // normalizing and apply difficult factor
    return {
        speed: speed * ratio * difficultyFactor,
        generosity: generosity * ratio * difficultyFactor,
        difficulty: difficultyFactor
    };
};

module.exports = {
    get: function (rng, tendencies, difficulty) {
        difficulty += tendencies.difficulty;

        return generateMetaData(rng.random, tendencies.speed, tendencies.generosity, difficulty);
    }
};
