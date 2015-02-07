"use strict";

var pool = require('../../lib/pool'),
    playerShot = require('../entities/playerShot');

module.exports = pool({
    name: 'playerShot',
    factory: playerShot,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        //element.initialize();
    },
    initialNumber: 40
});
