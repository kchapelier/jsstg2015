"use strict";

var pool = require('migl-pool'),
    EnemyShot = require('../entities/enemyShot'),
    textureCollection = require('./../textureCollection');

module.exports = pool.create({
    name: 'enemyShot',
    factory: function () {
        return new EnemyShot();
    },
    initialize: function (element, options) {
        element.grazed = false;
        element.x = options.x;
        element.y = options.y;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        element.setTexture(textureCollection.get(options.texture));
    },
    firstAllocationNumber: 1000,
    allocationNumber: 10
});
