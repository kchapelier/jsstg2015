"use strict";

var input = require('../input');

module.exports = {
    focused: false,
    normalSpeed: 290,
    focusedSpeed: 170,
    lastShot: 0,
    shotFrequency: 66,
    shooting: false,
    update: function (element, dt) {
        var directionIntent = element.directionIntent;

        if (input.currentInput.UP) {
            directionIntent.y = -input.currentInput.UP;
        } else if (input.currentInput.DOWN) {
            directionIntent.y = input.currentInput.DOWN;
        } else {
            directionIntent.y = 0;
        }

        if (input.currentInput.LEFT) {
            directionIntent.x = -input.currentInput.LEFT;
        } else if (input.currentInput.RIGHT) {
            directionIntent.x = input.currentInput.RIGHT;
        } else {
            directionIntent.x = 0;
        }

        if ((directionIntent.x !== 0 || directionIntent.y !== 0) && directionIntent.lengthSq() > 1) {
            directionIntent.normalize();
        }

        element.focused = !!input.currentInput.FOCUS;

        if (element.focused) {
            element.speed = element.focusedSpeed;
        } else {
            element.speed = element.normalSpeed;
        }

        if (element.lastShot > 0) {
            element.shooting = false;
            element.lastShot -= dt;
        } else if (input.currentInput.SHOOT) {
            element.shooting = true;
            element.lastShot = element.shotFrequency;
        }
    }
};
