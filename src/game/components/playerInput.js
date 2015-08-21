"use strict";

var input = require('../input'),
    upCommand = input.commands.UP,
    downCommand = input.commands.DOWN,
    leftCommand = input.commands.LEFT,
    rightCommand = input.commands.RIGHT,
    focusCommand = input.commands.FOCUS,
    shootCommand = input.commands.SHOOT;


module.exports = {
    focused: false,
    normalSpeed: 280,
    focusedSpeed: 150,
    update: function (element, dt) {
        var directionIntent = element.directionIntent;

        if (upCommand.active) {
            directionIntent.y = -upCommand.value;
        } else if (downCommand.active) {
            directionIntent.y = downCommand.value;
        } else {
            directionIntent.y = 0;
        }

        if (leftCommand.active) {
            directionIntent.x = -leftCommand.value;
        } else if (rightCommand.active) {
            directionIntent.x = rightCommand.value;
        } else {
            directionIntent.x = 0;
        }

        if ((directionIntent.x !== 0 || directionIntent.y !== 0) && directionIntent.lengthSq() > 1) {
            directionIntent.normalize();
        }

        element.focused = focusCommand.active;
        element.speed = element.focused ? element.focusedSpeed : element.normalSpeed;

        element.shooting = shootCommand.active;
    }
};
