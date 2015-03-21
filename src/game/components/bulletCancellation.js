"use strict";

var objectCollection = require('./../objectCollection'),
    explosionPool = require('./../pools/explosionPool'),
    enemyShotArray = objectCollection.getArray('enemyShot');

module.exports = {
    cancellationRadius: 100,
    cancellationColors: null,
    cancelBullets: function () {
        var shot,
            cancelX = this.x,
            cancelY = this.y,
            cancelRadius = this.cancellationRadius,
            i = 0,
            euclideanDistance = 0,
            toRemove = [];

        for (; i < enemyShotArray.length; i++) {
            shot = enemyShotArray[i];
            euclideanDistance = Math.sqrt(
                Math.pow(cancelX - shot.x, 2) +
                Math.pow(cancelY - shot.y, 2)
            );

            if (euclideanDistance < cancelRadius) {
                toRemove.push(shot);
            }
        }

        for (i = 0; i < toRemove.length; i++) {
            objectCollection.add('explosion', explosionPool.get({
                x: toRemove[i].x,
                y: toRemove[i].y,
                colors: this.explosionColors,
                size: 0.001,
                type: 'cancellation'
            }));

            objectCollection.remove('enemyShot', toRemove[i]);
        }

    }
};
