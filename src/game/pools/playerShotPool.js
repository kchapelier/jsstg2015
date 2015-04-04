"use strict";

var pool = require('migl-pool'),
    playerShot = require('../entities/playerShot');

module.exports = pool.create({
    name: 'playerShot',
    factory: playerShot,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        //element.initialize();
    },
    firstAllocationNumber: 40,
    allocationNumber: 5
});
