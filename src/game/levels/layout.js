"use strict";

/*
For future reference :

e : simple enemy
E : big enemy
m : meteor style passage
M : hard meteor style passage
B : boss
X : extra boss
? : random but not boss
 */


var validLayouts = [
    /* /
    {
        schema: ['B'],
        probability: 1,
        innerProbabilities: {}
    }
    /*/
    {
        schema: ['e', '?', '?', '?', '?', 'E', 'B'],
        probability: 20,
        innerProbabilities: {
            e: 10,
            E: 7,
            m: 1,
            M: 1
        }
    },
    {
        schema: ['m', '?', '?', '?', '?', 'M', 'B'],
        probability: 10,
        innerProbabilities: {
            e: 3,
            E: 5,
            m: 5,
            M: 5
        }
    },
    {
        schema: ['E', '?', '?', '?', 'E', 'B'],
        probability: 10,
        innerProbabilities: {
            e: 10,
            E: 9
        }
    },
    {
        schema: ['X'],
        probability: 1,
        innerProbabilities: {}
    }
    /* */
];

var sumProbability = 0;

validLayouts.forEach(function (layout) {
    var sumInnerProbability = 0;

    for (var key in layout.innerProbabilities) {
        if (layout.innerProbabilities.hasOwnProperty(key)) {
            sumInnerProbability = sumInnerProbability + layout.innerProbabilities[key];
        }
    }

    layout.sumInnerProbability = sumInnerProbability;
    sumProbability = sumProbability + layout.probability;
});

var getLayout = function (rng) {
    var p = rng.randomBounded(0, sumProbability),
        i = 0,
        layout;

    for (; i < validLayouts.length && p > 0; i++) {
        layout = validLayouts[i];
        p = p - layout.probability;
    }

    return layout;
};

var randomToken = function (rng, layout) {
    var p = rng.randomBounded(0, layout.sumInnerProbability),
        token;

    for (var key in layout.innerProbabilities) {
        if (layout.innerProbabilities.hasOwnProperty(key)) {
            token = key;
            p = p - layout.innerProbabilities[key];

            if (p < 0) {
                break;
            }
        }
    }

    return token;
};

var resolveLayout = function (rng, layout) {
    var schema = layout.schema,
        processedLayout = [];

    schema.forEach(function (token) {
        if (token === '?') {
            token = randomToken(rng, layout);
        }

        processedLayout.push(token);
    });

    return processedLayout;
};

module.exports = {
    get: function (rng) {
        var layout = getLayout(rng);
        return resolveLayout(rng, layout);
    }
};
