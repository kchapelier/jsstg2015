"use strict";

//rect winder style

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool'),
    enemyShotsArray = collection.getArray('enemyShot'),
    meteorsArray = collection.getArray('meteor');

module.exports = {
    lastShot: 0,
    shotFrequency: 1000,
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
            var relativePosX = element.x,
                relativePosY = element.y - 60;

            for(var i = enemyShotsArray.length - 1; i >= 0; i--) {
                var shot = enemyShotsArray[i];

                var dist = Math.max(Math.abs(relativePosX - shot.x), Math.abs(relativePosY - shot.y));

                if (dist < 60) {
                    collection.remove('enemyShot', shot);

                    collection.add('playerShot', shotPool.get({
                        x: shot.x,
                        y: shot.y,
                        speed: (400 + shot.speed) / 2,
                        texture: shot.sprite.texture,
                        directionIntent: {
                            x: shot.directionIntent.x * 0.1,
                            y: -1 + Math.random() * 0.025
                        }
                    }));
                }
            }

            for(i = 0; i < meteorsArray.length; i++) {
                var meteor = meteorsArray[i];

                var dist = Math.max(Math.abs(relativePosX - meteor.x), Math.abs(relativePosY - meteor.y));

                if (dist < 60) {
                    meteor.directionIntent.y = meteor.directionIntent.y / 2 - 1;
                    meteor.directionIntent.x*=0.66;
                }

            }
        }
    }
};
