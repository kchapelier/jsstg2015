"use strict";

var pool = require('../../lib/pool'),
    bigEnemy = require('../entities/bigEnemy');

module.exports = pool({
    name: 'bigEnemy',
    factory: bigEnemy,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed || 0;
        element.directionIntent = options.directionIntent || { x: 0, y: 0 };
        element.sequence = options.sequence || null;
    },
    initialNumber: 5
});
