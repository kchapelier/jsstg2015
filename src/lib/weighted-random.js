"use strict";


var weightedRandom2 = function weightedRandom2 (options, rand) {
    var sumWeight = options.sumWeight,
        randomValue,
        i;

    rand = rand || Math.random;

    if (!sumWeight) {
        options.sumWeight = sumWeight = options.reduce(function (previous, item) {
            return previous + item.weight;
        }, 0);
    }

    randomValue = rand() * sumWeight;

    options.every();

    for (i = 0; i < options.length; i++) {
        sumWeight = sumWeight - options[i].weight;

        if (sumWeight <= 0) {
            return options[i];
        }
    }

    return null;
};

module.exports = weightedRandom;
