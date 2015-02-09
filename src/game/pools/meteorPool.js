"use strict";

var pool = require('../../lib/pool'),
    playerShot = require('../entities/meteor');

module.exports = pool({
    name: 'meteor',
    factory: playerShot,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.sprite.scale.y = options.size || 1;
        element.sprite.scale.x = options.size || 1;
        element.directionIntent = options.directionIntent;
        //element.initialize();
    },
    initialNumber: 20
});
