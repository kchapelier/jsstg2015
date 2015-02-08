var wmc = require('./../../lib/wmc-level-names');

module.exports = {
    get: function (rng) {
        var systemName = wmc.get(rng.random),
            systemCount = rng.randomBounded(1, 599),
            systemNumber = Math.floor(rng.randomBounded(1, systemCount)),
            systemPlanetCount = rng.randomBounded(1, 10),
            planetNumber = Math.floor(rng.randomBounded(1, systemPlanetCount));

        return systemName + '-' + systemNumber + '.' + String.fromCharCode(96 + planetNumber);
    }
};
