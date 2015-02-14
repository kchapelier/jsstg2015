"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite');

module.exports = {
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (element, dt) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;
    }
};
