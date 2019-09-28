"use strict";

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool'),
    PIXI = require('pixi.js'),
    textureCollection = require('./../../textureCollection'),
    texture = textureCollection.get('player-sprite'),
    PI_2 = Math.PI / 2;

var RotatingOptions = function RotatingOptions (parent) {
    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 40;
    this.options = null;
    this.optionsAngle = 0;

    this.time = 0;
    this.initializeOptions();
};

RotatingOptions.prototype.initializeOptions = function () {
    var option,
        i;

    this.options = new Array(4);

    for (i = 0; i < 4; i++) {
        option = new PIXI.Sprite(texture);
        option.anchor = new PIXI.Point(0.5, 0.5);
        this.options[i] = option;
    }
};

RotatingOptions.prototype.update = function (shooting, dt) {
    var shootNow = false,
        option,
        angle,
        i;

    if (this.lastShot > 0) {
        this.lastShot -= dt;
    } else if (shooting) {
        shootNow = true;
        this.lastShot = this.shotFrequency;
    }

    this.optionsAngle += dt / 600;
    this.time += dt / 250;

    for (i = 0; i < 4; i++) {
        option = this.options[i];
        angle = this.optionsAngle + i * PI_2;
        option.x = Math.round(this.parent.x + Math.cos(angle) * (30 + 10 * Math.sin(this.time)));
        option.y = Math.round(this.parent.y + Math.sin(angle) * (30 + 10 * Math.sin(this.time)));
        option.rotation = angle;

        if (shootNow) {
            collection.add('playerShot', shotPool.get({
                x: this.options[i].x - 3.3,
                y: this.options[i].y,
                speed: 550,
                directionIntent: { x : 0, y : -1 }
            }));
            collection.add('playerShot', shotPool.get({
                x: this.options[i].x + 3.3,
                y: this.options[i].y,
                speed: 550,
                directionIntent: { x : 0, y : -1 }
            }));
        }
    }
};

module.exports = RotatingOptions;
