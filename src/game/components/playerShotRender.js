"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-bullet');

module.exports = {
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
    },
    render: function (element) {
        element.sprite.x = Math.round(element.x) + (32 - element.sprite.width) / 2;
        element.sprite.y = Math.round(element.y);
    }
};
