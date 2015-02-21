"use strict";

var pool = require('../../lib/pool'),
    explosion = require('../entities/explosion');

module.exports = pool({
    name: 'explosion',
    factory: explosion,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = 0; //options.speed;
        element.emitter.minimumScaleMultiplier = 1; //options.size || 1;
        element.directionIntent = {
            x: 0,
            y: 0
        };

        if (options.colors) {
            element.setColors(options.colors);
        }
    },
    initialNumber: 5
});
