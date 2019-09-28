"use strict";

var renderer = require('../renderer');

module.exports = {
    update: function (element) {
        //limit the player movement to the screen
        element.x = Math.max(8, Math.min(renderer.screenWidth - 8, element.x));
        element.y = Math.max(16, Math.min(renderer.screenHeight - 16, element.y));
    }
};
