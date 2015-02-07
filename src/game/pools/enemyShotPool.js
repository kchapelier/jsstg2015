"use strict";

var pool = require('../../lib/pool'),
    enemyShot = require('../entities/enemyShot');

module.exports = pool({
    name: 'enemyShot',
    factory: enemyShot,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        element.setTexture(options.texture);
    },
    initialNumber: 1000
});
