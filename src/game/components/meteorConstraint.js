"use strict";

var renderer = require('../renderer'),
    objectCollection = require('../objectCollection'),
    margin = 600;

module.exports = {
    postUpdateConstraint: function (dt) {
        if (
            this.y > renderer.screenHeight + margin
        ) {
            objectCollection.remove('meteor', this);
        }
    }
};
