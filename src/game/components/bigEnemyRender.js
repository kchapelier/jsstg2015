"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('enemy-sprite'),
    textureIndicator = textureCollection.get('indicator'),
    objectCollection = require('./../objectCollection');

module.exports = {
    displayLifeBar: false,
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);

        //TODO move enemy indicator to GUI
        element.indicator = new PIXI.Sprite(textureIndicator);
        element.indicator.anchor = new PIXI.Point(0.5, 0.5);
        element.indicator.y = 600 - element.indicator.width / 2;
    },
    postUpdate: function (element, dt) {
        var player = objectCollection.getArray('player')[0],
            dirX = player.x - element.x,
            dirY = player.y - element.y,
            angle = Math.atan2(dirX, dirY);

        element.sprite.rotation = -angle;
    },
    render: function (element, dt) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;

        element.indicator.x = element.x;
    }
};
