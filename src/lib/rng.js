"use strict";

var seedRandom = require('seedrandom'),
    Noise = require('noisejs').Noise;

var castToIntArbitrarily = function castToIntArbitrarily (string, max) {
    var result = 0,
        i = 0;

    max = max || 1000000;

    for (; i < string.length; i++) {
        result += (string.charCodeAt(i) % 91) * Math.pow(91, i);
    }

    return result % max;
};

var createRandomNumberGenerator = function createRandomNumberGenerator (string) {
    var seed = castToIntArbitrarily(string),
        rng = seedRandom(seed, {
            entropy: false
        }),
        noise = new Noise(0.9 || seed);

    return {
        seedSource: string,
        seed: seed,
        random: rng,
        randomBounded: function (min, max) {
            return min + rng() * (max - min);
        },
        perlin2: function (x, y) {
            return noise.perlin2(x, y);
        },
        perlin3: function (x, y, z) {
            return noise.perlin3(x, y, z);
        },
        simplex2: function (x, y) {
            return noise.simplex2(x, y);
        },
        simplex3: function (x, y, z) {
            return noise.simplex3(x, y, z);
        }
    };
};

module.exports = {
    createFromString: function (string) {
        return createRandomNumberGenerator(string);
    }
};
