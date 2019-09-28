"use strict";

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool'),
    PIXI = require('pixi.js'),
    textureCollection = require('./../../textureCollection'),
    texture = textureCollection.get('player-sprite');

var FixedOptions = function FixedOptions (parent) {
    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 40;
    this.options = null;

    this.initializeOptions();
};

FixedOptions.prototype.initializeOptions = function () {
    var option,
        i;

    this.options = new Array(4);

    for (i = 0; i < 4; i++) {
        option = new PIXI.Sprite(texture);
        option.anchor = new PIXI.Point(0.5, 0.5);
        this.options[i] = option;
    }
};

FixedOptions.prototype.update = function (shooting, dt) {
    var shootNow = false,
        option,
        i;

    option = this.options[0];
    option.x = this.parent.x - 35;
    option.y = this.parent.y;

    option = this.options[1];
    option.x = this.parent.x - 10;
    option.y = this.parent.y + 33;

    option = this.options[2];
    option.x = this.parent.x + 35;
    option.y = this.parent.y;

    option = this.options[3];
    option.x = this.parent.x + 10;
    option.y = this.parent.y + 33;

    if (this.lastShot > 0) {
        this.lastShot -= dt;
    } else if (shooting) {
        shootNow = true;
        this.lastShot = this.shotFrequency;
    }

    if (shootNow) {
        for (i = 0; i < 4; i++) {
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

module.exports = FixedOptions;
