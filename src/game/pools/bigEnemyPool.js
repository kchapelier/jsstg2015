"use strict";

var pool = require('../../lib/pool'),
    bigEnemy = require('../entities/bigEnemy');

module.exports = pool({
    name: 'bigEnemy',
    factory: bigEnemy,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
    },
    initialNumber: 5
});
