"use strict";

var pool = require('../../lib/pool'),
    meteor = require('../entities/meteor');

module.exports = pool({
    name: 'meteor',
    factory: meteor,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.hitboxRadius = 6 * (options.size || 1);
        element.sprite.scale.y = element.sprite.scale.x = options.size || 1;
        element.emitter.minimumScaleMultiplier = options.size || 1;
        element.directionIntent = options.directionIntent;

        if (options.colors) {
            element.setColors(options.colors);
        }
        //element.initialize();
    },
    initialNumber: 20
});
