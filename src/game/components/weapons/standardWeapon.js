"use strict";

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool');

var StandardWeapon = function StandardWeapon (parent) {
    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 44;
};

StandardWeapon.prototype.update = function (shooting, dt) {
    var shootNow = false;

    if (this.lastShot > 0) {
        this.lastShot -= dt;
    } else if (shooting) {
        shootNow = true;
        this.lastShot = this.shotFrequency;
    }

    if (shootNow) {
        collection.add('playerShot', shotPool.get({
            x: this.parent.x + 5,
            y: this.parent.y - 17,
            speed: 550,
            directionIntent: {
                x: 0.05,
                y: -1
            }
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x - 2,
            y: this.parent.y - 20,
            speed: 560,
            directionIntent: {
                x: -0.01,
                y: -1
            }
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x + 2,
            y: this.parent.y - 20,
            speed: 560,
            directionIntent: {
                x: 0.01,
                y: -1
            }
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x - 5,
            y: this.parent.y - 17,
            speed: 550,
            directionIntent: {
                x: -0.05,
                y: -1
            }
        }));
    }
};

module.exports = StandardWeapon;
