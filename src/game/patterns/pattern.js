"use strict";

var Victor = require('victor'),
    collection = require('../objectCollection'),
    shotPool = require('../pools/enemyShotPool');

var shot = function (position, speed, speedRandomIncrement, sprite, direction) {
    if (speedRandomIncrement) {
        speed += Math.random() * speedRandomIncrement;
    }

    collection.add('enemyShot', shotPool.get({
        x: position.x,
        y: position.y,
        texture: sprite,
        speed: speed,
        directionIntent: direction
    }));
};

var Pattern = function (source, destination) {
    this.source = source;
    this.destination = destination;
    this.aimDirection = new Victor(0, 1);
    this.playerDirection = new Victor(1, 0);

    this.bulletSprite = 'default-bullet';
    this.bulletSpeed = 200;
    this.bulletSpeedRandomIncrement = 0;
};

Pattern.prototype.source = null;
Pattern.prototype.destination = null;
Pattern.prototype.aimDirection = null;
Pattern.prototype.playerDirection = null;

Pattern.prototype.bulletSprite = null;
Pattern.prototype.bulletSpeed = null;
Pattern.prototype.bulletSpeedRandomIncrement = null;

Pattern.prototype.setSource = function (source) {
    this.source = source;
};

Pattern.prototype.setDestination = function (destination) {
    this.destination = destination;
};

Pattern.prototype.updatePlayerDirection = function () {
    var angle = Math.atan2(this.destination.y - this.source.y, this.destination.x - this.source.x);

    this.playerDirection.x = 1;
    this.playerDirection.y = 0;

    this.playerDirection.rotate(angle);
};

Pattern.prototype.update = function () {
    this.updatePlayerDirection();
};

Pattern.prototype.rotate = function (angle) {
    this.aimDirection.rotate(angle);
};

Pattern.prototype.setBulletSpeed = function (speed, randomIncrement) {
    /*
    if (typeof speed === 'function') {
        speed = speed();
    }
    */
    this.bulletSpeedRandomIncrement = randomIncrement;
    this.bulletSpeed = speed;
};

Pattern.prototype.increaseBulletSpeed = function (increase) {
    this.bulletSpeed += increase;
};

Pattern.prototype.setBulletSprite = function (sprite) {
    this.bulletSprite = sprite;
};

Pattern.prototype.randomBulletSprite = function (sprites) {
    var i = Math.floor(Math.random() * arguments.length);
    this.bulletSprite = arguments[i];
};

Pattern.prototype.setAngle = function (angle, fromPlayer) {
    if (fromPlayer) {
        this.aimDirection = this.playerDirection.clone();
        this.aimDirection.rotate(angle);
    } else {
        this.aimDirection.x = 1;
        this.aimDirection.y = 0;
        this.aimDirection.rotate(angle);
    }
};

Pattern.prototype.randomAngle = function () {
    this.aimDirection.rotate(Math.random() * Math.PI * 2);
};

Pattern.prototype.singleShot = function (angleDeviation, fromPlayer) {
    var v = (fromPlayer ? this.playerDirection : this.aimDirection).clone();

    v.rotate(angleDeviation);

    shot(this.source, this.bulletSpeed, this.bulletSpeedRandomIncrement, this.bulletSprite, v);
};

Pattern.prototype.randomShot = function (number, angleSpread, angleDeviation, fromPlayer) {
    var v = (fromPlayer ? this.playerDirection : this.aimDirection).clone();

    v.rotate(angleDeviation - angleSpread / 2);

    for (var i = 0; i < number; i++) {
        var vc = v.clone();
        vc.rotate(angleSpread * Math.random());
        shot(this.source, this.bulletSpeed, this.bulletSpeedRandomIncrement, this.bulletSprite, vc);
    }
};

Pattern.prototype.burst = function (number, angleSpread, angleDeviation, fromPlayer) {
    var v = (fromPlayer ? this.playerDirection : this.aimDirection).clone();

    v.rotate(angleDeviation - angleSpread / 2);

    for (var i = 0; i < number; i++) {
        shot(this.source, this.bulletSpeed, this.bulletSpeedRandomIncrement, this.bulletSprite, v.clone());
        v.rotate(angleSpread / (number - 1));
    }
};

module.exports = Pattern;
