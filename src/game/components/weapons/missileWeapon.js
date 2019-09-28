"use strict";

var collection = require('../../objectCollection'),
    missilePool = require('../../pools/playerMissilePool');

var MissileWeapon = function MissileWeapon (parent) {
    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 30;
};

MissileWeapon.prototype.update = function (shooting, dt) {
    var shootNow = false;

    if (this.lastShot > 0) {
        this.lastShot -= dt;
    } else if (shooting) {
        shootNow = true;
        this.lastShot = this.shotFrequency;
    }

    if (shootNow) {
        collection.add('playerMissile', missilePool.get({
            x: this.parent.x,
            y: this.parent.y + 10,
            damage: 10,
            speed: 190,
            baseYSpeed: -1,
            maxYSpeed: 4,
            ySpeedAcceleration: 0.004,
            directionIntent: {
                x: Math.random() * 0.5 - 0.25 + this.parent.directionIntent.x / 3,
                y: -1 - this.parent.directionIntent.y / 2
            }
        }));
    }
};

module.exports = MissileWeapon;
