"use strict";

var pool = require('../../lib/pool'),
    bigEnemy = require('../entities/bigEnemy');

module.exports = pool({
    name: 'bigEnemy',
    factory: bigEnemy,
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.life = options.life || 100;
        element.invincible = !!options.invincible;
        element.speed = options.speed || 0;
        element.directionIntent = options.directionIntent || { x: 0, y: 0 };
        element.sequence = options.sequence || null;
        element.explosionSize = options.explosionSize || 1;
        element.explosionColors = options.explosionColors || null;
    },
    initialNumber: 5
});
