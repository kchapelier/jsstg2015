"use strict";

var pool = require('../../lib/pool'),
    explosion = require('../entities/explosion');

module.exports = pool({
    name: 'explosion',
    factory: explosion,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = 0;
        element.directionIntent = {
            x: 0,
            y: 0
        };

        element.setType(options.type);

        element.emitter.minimumScaleMultiplier = options.size + Math.random() * 0.3;

        if (options.colors) {
            element.setColors(options.colors);
        }
    },
    initialNumber: 5
});
