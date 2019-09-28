"use strict";

var renderer = require('../renderer'),
    objectCollection = require('../objectCollection'),
    margin = 50;

module.exports = {
    postUpdateConstraint: function () {
        if (
            this.x < 0 - margin ||
            this.y < 0 - margin ||
            this.x > renderer.screenWidth + margin ||
            this.y > renderer.screenHeight + margin
        ) {
            objectCollection.remove('enemyShot', this);
        }
    }
};
