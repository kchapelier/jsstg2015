"use strict";

var Victor = require('victor');

module.exports = {
    x: 0,
    y: 0,
    speed: 250,
    initialize: function (element) {
        if (!element.direction) {
            element.direction = new Victor(0, 0);
        }

        if (!element.directionIntent) {
            element.directionIntent = new Victor(0, 0);
        }
    },
    update: function (element, dt) {
        var multiplier = 1000 / element.speed;

        element.x += element.directionIntent.x * dt / multiplier;
        element.y += element.directionIntent.y * dt / multiplier;
    }
};
