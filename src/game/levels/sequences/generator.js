"use strict";

var Sequence = require('../../patterns/sequence');

var collection = {
    seal: require('./sealSequence'),
    pulse: require('./pulseSequence'),
    test: require('./testSequence'),
    perlin: require('./perlinSequence')
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

var getSequenceDuration = function (definition) {
    return definition.reduce(function (duration, line) {
        if (line[0] === 'wait') {
            duration += line[1];
        }

        return duration;
    }, 0);
};

var createDefinition = function (patternKey, levelRng, patternMetaData) {
    return collection[patternKey](levelRng, patternMetaData.speed, patternMetaData.generosity, patternMetaData.difficulty);
};

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

module.exports = {
    generateSequence: function (levelRng, patternMetaData, preferences) {
        var minimumDuration = 60000 * patternMetaData.difficulty,
            currentDuration = 0,
            pauseBetween = 2000,
            wholeDefinition = [],
            patternKey,
            definition;

        while (currentDuration < minimumDuration) {
            if (wholeDefinition.length) {
                wholeDefinition.push(['wait', pauseBetween]);
                currentDuration += pauseBetween;
            }

            patternKey = getRandomFromPreferences(levelRng, preferences);
            definition = createDefinition(patternKey, levelRng, patternMetaData);

            currentDuration += getSequenceDuration(definition);
            wholeDefinition = wholeDefinition.concat(definition);
        }

        return new Sequence(wholeDefinition, 1);
    }
};
