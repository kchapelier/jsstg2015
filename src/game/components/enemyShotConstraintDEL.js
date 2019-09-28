"use strict";

var renderer = require('../renderer'),
    objectCollection = require('../objectCollection'),
    margin = 50;

module.exports = {
    postUpdate: function (element) {
        if (
            element.x < 0 - margin ||
            element.y < 0 - margin ||
            element.x > renderer.screenWidth + margin ||
            element.y > renderer.screenHeight + margin
        ) {
            objectCollection.remove('enemyShot', element);
        }
    }
};
