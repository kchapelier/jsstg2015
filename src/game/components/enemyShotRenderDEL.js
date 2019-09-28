"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var defaultTexture = textureCollection.get('particle');

module.exports = {
    initialize: function (element) {
        var bulletTexture;

        if (!!element.texture) {
            bulletTexture = textureCollection.get(element.texture);
        }

        element.sprite = new PIXI.Sprite(bulletTexture ? bulletTexture : defaultTexture);
        //element.sprite.blendMode = PIXI.blendModes.ADD;
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (element, dt) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;
    },
    setTexture: function (texture) {
        this.sprite.texture = textureCollection.get(texture);
    }
};
