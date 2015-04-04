"use strict";

var pool = require('migl-pool'),
    enemyShot = require('../entities/enemyShot');

module.exports = pool.create({
    name: 'enemyShot',
    factory: enemyShot,
    initialize: function (element, options) {
        element.grazed = false;
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        element.setTexture(options.texture);
    },
    firstAllocationNumber: 2000,
    allocationNumber: 10
});
