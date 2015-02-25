"use strict";

var collection = require('../objectCollection'),
    shotPool = require('../pools/playerShotPool');

module.exports = {
    lastShot: 0,
    shotFrequency: 44,
    shooting: false,
    update: function (element, dt) {
        var shootNow = false;

        if (element.lastShot > 0) {
            element.lastShot -= dt;
        } else if (element.shooting) {
            shootNow = true;
            element.lastShot = element.shotFrequency;
        }

        if (shootNow) {
            collection.add('playerShot', shotPool.get({
                x: element.x + 5,
                y: element.y - 17,
                speed: 550,
                directionIntent: {
                    x: 0.05,
                    y: -1
                }
            }));

            collection.add('playerShot', shotPool.get({
                x: element.x - 2,
                y: element.y - 20,
                speed: 560,
                directionIntent: {
                    x: -0.01,
                    y: -1
                }
            }));

            collection.add('playerShot', shotPool.get({
                x: element.x + 2,
                y: element.y - 20,
                speed: 560,
                directionIntent: {
                    x: 0.01,
                    y: -1
                }
            }));

            collection.add('playerShot', shotPool.get({
                x: element.x - 5,
                y: element.y - 17,
                speed: 550,
                directionIntent: {
                    x: -0.05,
                    y: -1
                }
            }));
        }
    }
};
