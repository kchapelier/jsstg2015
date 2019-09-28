"use strict";

var renderer = require('../renderer');

module.exports = {
    updateConstraint: function () {
        //limit the player movement to the screen
        this.x = Math.max(8, Math.min(renderer.screenWidth - 8, this.x));
        this.y = Math.max(16, Math.min(renderer.screenHeight - 16, this.y));
    }
};
