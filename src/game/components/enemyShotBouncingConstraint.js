"use strict";

var renderer = require('../renderer'),
    objectCollection = require('../objectCollection'),
    margin = 50;

module.exports = {
    postUpdateConstraint: function () {
        if (
            this.y < 0 - margin ||
            this.y > renderer.screenHeight + margin
        ) {
            objectCollection.remove('enemyShot', this);
        } else if (this.x <= 0) {
            this.x = 0;
            this.directionIntent.x *= -1;
            this.bounces++;
        } else if (this.x >= renderer.screenWidth) {
            this.x = renderer.screenWidth;
            this.directionIntent.x *= -1;
            this.bounces++;
        }
    }
};
