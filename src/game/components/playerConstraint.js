"use strict";

var renderer = require('../renderer');

module.exports = {
    postUpdate: function (element) {
        //limit the player movement to the screen
        element.x = Math.max(0, Math.min(renderer.screenWidth - 32, element.x));
        element.y = Math.max(0, Math.min(renderer.screenHeight - 32, element.y));
    }
};
