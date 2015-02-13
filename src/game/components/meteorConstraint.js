"use strict";

var renderer = require('../renderer'),
    objectCollection = require('../objectCollection'),
    margin = 600;

module.exports = {
    postUpdate: function (element) {
        if (
            element.y > renderer.screenHeight + margin
        ) {
            objectCollection.remove('meteor', element);
        }
    }
};
