"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var defaultTexture = textureCollection.get('player-bullet');

module.exports = {
    initialize: function (element) {
        var bulletTexture;

        if (!!element.texture) {
            bulletTexture = textureCollection.get(element.texture);
        }

        element.sprite = new PIXI.Sprite(bulletTexture ? bulletTexture : defaultTexture);

        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (element) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;
    },
    setTexture: function (texture) {
        this.sprite.setTexture(textureCollection.get(texture));
    }
};
