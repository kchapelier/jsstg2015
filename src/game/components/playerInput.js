"use strict";

var input = require('../input');

module.exports = {
    focused: false,
    normalSpeed: 280,
    focusedSpeed: 150,
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

        element.focused = input.currentInput.FOCUS;
        element.speed = element.focused ? element.focusedSpeed : element.normalSpeed;

        element.shooting = input.currentInput.SHOOT;
    }
};
