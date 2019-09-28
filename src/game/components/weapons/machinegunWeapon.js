"use strict";

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool');

var MachinegunWeapon = function MachinegunWeapon (parent) {
    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 20;
};

MachinegunWeapon.prototype.update = function (shooting, dt) {
    var shootNow = false,
        offset,
        i;

    if (this.lastShot > 0) {
        this.lastShot -= dt;
    } else if (shooting) {
        shootNow = true;
        this.lastShot = this.shotFrequency;
    }

    if (shootNow) {
        for (i = 0; i < 3; i++) {
            offset = Math.random() - 0.5;

            collection.add('playerShot', shotPool.get({
                x: this.parent.x + offset * 11,
                y: this.parent.y - 17,
                speed: 550,
                directionIntent: {
                    x: offset / 10,
                    y: -1
                }
            }));
        }
    }
};

module.exports = MachinegunWeapon;
