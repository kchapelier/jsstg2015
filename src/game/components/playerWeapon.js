"use strict";

var collection = require('../objectCollection'),
    shotPool = require('../pools/playerShotPool');

module.exports = {
    update: function (element, dt) {
        if (!!element.shooting) {
            collection.add('playerShot', shotPool.get({
                x: element.x + 10,
                y: element.y - 20,
                speed: 650,
                directionIntent: {
                    x: 0,
                    y: -1
                }
            }));

            collection.add('playerShot', shotPool.get({
                x: element.x - 10,
                y: element.y - 20,
                speed: 650,
                directionIntent: {
                    x: 0,
                    y: -1
                }
            }));
        }
    }
};
