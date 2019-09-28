"use strict";

var collection = require('../../objectCollection'),
    shotPool = require('../../pools/playerShotPool'),
    PIXI = require('pixi.js'),
    textureCollection = require('./../../textureCollection'),
    texture = textureCollection.get('player-sprite');

var FollowingOptions = function FollowingOptions (parent) {
    var i = 0;

    this.parent = parent;
    this.lastShot = 0;
    this.shotFrequency = 40;
    this.options = null;
    this.trail = new Array(100);

    for (i = 0; i < 100; i+=2) {
        this.trail[i] = 0;
        this.trail[i+1] = 0;
    }

    this.initializeOptions();
};

FollowingOptions.prototype.initializeOptions = function () {
    var option,
        i;

    this.options = new Array(4);

    for (i = 0; i < 4; i++) {
        option = new PIXI.Sprite(texture);
        option.anchor = new PIXI.Point(0.5, 0.5);
        this.options[i] = option;
    }
};

FollowingOptions.prototype.update = function (shooting, dt) {
    var shootNow = false,
        option,
        i;

    option = this.options[0];
    option.x = this.trail[24];
    option.y = this.trail[25];

    option = this.options[1];
    option.x = this.trail[48];
    option.y = this.trail[49];

    option = this.options[2];
    option.x = this.trail[74];
    option.y = this.trail[75];

    option = this.options[3];
    option.x = this.trail[98];
    option.y = this.trail[99];

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

FollowingOptions.prototype.postUpdate = function (shooting, dt) {
    var dist = Math.pow(this.trail[0] - this.parent.x, 2) + Math.pow(this.trail[1] - this.parent.y, 2),
        i;

    if (dist > 1) {
        for (i = 98; i > 1; i -= 2) {
            this.trail[i] = this.trail[i - 2];
            this.trail[i + 1] = this.trail[i - 1];
        }

        this.trail[0] = this.parent.x;
        this.trail[1] = this.parent.y;
    }
};

module.exports = FollowingOptions;
