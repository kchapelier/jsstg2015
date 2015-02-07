"use strict";

var PIXI = require('pixi.js');

var dictionary = {};

var textureCollection = {
    load: function (id, url) {
        dictionary[id] = PIXI.Texture.fromImage('./assets/images/' + url, false);
    },
    get: function (id) {
        if (!!dictionary[id]) {
            return dictionary[id];
        }
    }
};

module.exports = textureCollection;
