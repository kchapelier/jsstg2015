"use strict";

var pool = require('migl-pool'),
    PlayerShot = require('../entities/playerShot'),
    textureCollection = require('./../textureCollection');

module.exports = pool.create({
    name: 'playerShot',
    factory: function () {
        return new PlayerShot();
    },
    initialize: function (element, options) {
        element.x = options.x;
        element.y = options.y;
        element.angle = options.angle;
        element.speed = options.speed;
        element.directionIntent = options.directionIntent;
        element.damage = options.damage || 1;
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
