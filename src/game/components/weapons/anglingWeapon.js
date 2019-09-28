"use strict";

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool');

var makeAngledVector = function makeAngledVector (angle, speed) {
    return {
        x: speed * Math.sin(angle),
        y: speed * Math.cos(angle)
    };
};

var AnglingWeapon = function AnglingWeapon (parent) {
    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 44;
    this.shootingAngle = 0;
};

AnglingWeapon.prototype.update = function (shooting, dt) {
    var shootNow = false,
        angleSpeed = this.parent.directionIntent.x ? 0.03 : 0.06;

    this.shootingAngle = Math.min(0.5, Math.max(-0.5, (this.shootingAngle * (1 - angleSpeed) - this.parent.directionIntent.x * angleSpeed)));

    if (this.lastShot > 0) {
        this.lastShot -= dt;
    } else if (shooting) {
        shootNow = true;
        this.lastShot = this.shotFrequency;
    }

    if (shootNow) {
        collection.add('playerShot', shotPool.get({
            x: this.parent.x + 5,
            y: this.parent.y - 20,
            angle: this.shootingAngle - 0.125,
            speed: 550,
            directionIntent: makeAngledVector(this.shootingAngle - 0.125, -1)
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x + 3,
            y: this.parent.y - 20,
            angle: this.shootingAngle - 0.075,
            speed: 550,
            directionIntent: makeAngledVector(this.shootingAngle - 0.075, -1)
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x + 1,
            y: this.parent.y - 20,
            angle: this.shootingAngle - 0.025,
            speed: 550,
            directionIntent: makeAngledVector(this.shootingAngle - 0.025, -1)
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x - 1,
            y: this.parent.y - 20,
            angle: this.shootingAngle + 0.025,
            speed: 550,
            directionIntent: makeAngledVector(this.shootingAngle + 0.025, -1)
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x - 3,
            y: this.parent.y - 20,
            angle: this.shootingAngle + 0.075,
            speed: 550,
            directionIntent: makeAngledVector(this.shootingAngle + 0.075, -1)
        }));

        collection.add('playerShot', shotPool.get({
            x: this.parent.x - 5,
            y: this.parent.y - 20,
            angle: this.shootingAngle + 0.125,
            speed: 550,
            directionIntent: makeAngledVector(this.shootingAngle + 0.125, -1)
        }));
    }
};

module.exports = AnglingWeapon;
