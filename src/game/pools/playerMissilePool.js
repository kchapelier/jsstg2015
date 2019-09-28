"use strict";

var pool = require('migl-pool'),
    PlayerMissile = require('../entities/playerMissile'),
    textureCollection = require('./../textureCollection');

module.exports = pool.create({
    name: 'playerMissile',
    factory: function () {
        return new PlayerMissile();
    },
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.angle = options.angle;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        element.damage = options.damage || 1;

        element.baseYSpeed = element.currentYSpeed = options.baseYSpeed;
        element.maxYSpeed = options.maxYSpeed;
        element.ySpeedAcceleration = options.ySpeedAcceleration;
        //element.initialize();

        if (options.texture && options.texture.constructor.name === 'Texture') {
            element.setTexture(options.texture);
        } else {
            element.setTexture(textureCollection.get(options.texture || 'player-bullet2'));
        }

    },
    firstAllocationNumber: 40,
    allocationNumber: 5
});
