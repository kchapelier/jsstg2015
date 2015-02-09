"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite');

module.exports = {
    size : 1,
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.blendMode = PIXI.blendModes.ADD;
    },
    render: function (element) {
        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
    }
};
