"use strict";

var Sequence = require('../../patterns/sequence');

var collection = {
    seal: require('./sealSequence'),
    pulse: require('./pulseSequence'),
    test: require('./testSequence')
};

var getSumPreferences = function (preferences) {
    var sum = 0,
        key;

    for (key in preferences) {
        if (preferences.hasOwnProperty(key)) {
            sum += preferences[key];
        }
    }

    return sum;
};

var getRandomFromPreferences = function (levelRng, preferences) {
    //TODO I really need to implement this in rng or something, feels like I've been writing this way too many times

    var sumPref = getSumPreferences(preferences),
        choice = levelRng.randomBounded(0, sumPref),
        sum = 0,
        key;

    for (key in preferences) {
        if (preferences.hasOwnProperty(key)) {
            sum += preferences[key];

            if (sum > choice) {
                break;
            }
        }
    }

    return key;
};

var createDefinition = function (patternKey, levelRng, patternMetaData) {
    return collection[patternKey](levelRng, patternMetaData.speed, patternMetaData.generosity, patternMetaData.difficulty);
};

module.exports = {
    generateSequence: function (levelRng, patternMetaData, preferences) {
        var patternKey = getRandomFromPreferences(levelRng, preferences),
            definition = createDefinition(patternKey, levelRng, patternMetaData);

        return new Sequence(definition, 2);
    }
};
