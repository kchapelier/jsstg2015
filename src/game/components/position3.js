"use strict";

var Victor = require('victor');

module.exports = {
    x: 0,
    y: 0,
    speed: 250,
    speedMultiplier : 1,
    baseYSpeed: null,
    maxYSpeed: null,
    ySpeedAcceleration: null,
    currentYSpeed: null,
    initializePosition: function () {
        /*
        if (!this.direction) {
            this.direction = new Victor(0, 0);
        }
        */

        if (!this.directionIntent) {
            this.directionIntent = new Victor(0, 0);
        }
    },
    updatePosition: function (dt) {
        var multiplier = dt * this.speedMultiplier * this.speed / 1000;

        this.currentYSpeed = Math.min(this.maxYSpeed, this.currentYSpeed + this.ySpeedAcceleration * dt);

        this.x += this.directionIntent.x * multiplier;
        this.y += this.directionIntent.y * multiplier * this.currentYSpeed;
    }
};
