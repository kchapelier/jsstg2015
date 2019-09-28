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
    updateInput: function (dt) {
        var directionIntent = this.directionIntent;

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

        this.focused = focusCommand.active;
        this.speed = this.focused ? this.focusedSpeed : this.normalSpeed;

        this.shooting = shootCommand.active;
    }
};
