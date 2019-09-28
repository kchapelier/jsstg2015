"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var defaultTexture = textureCollection.get('particle');

module.exports = {
    initializeRender: function () {
        var bulletTexture;

        if (!!this.texture) {
            bulletTexture = textureCollection.get(this.texture);
        }

        this.sprite = new PIXI.Sprite(bulletTexture ? bulletTexture : defaultTexture);
        //element.sprite.blendMode = PIXI.blendModes.ADD;
        this.sprite.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (dt) {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    },
    setTexture: function (texture) {
        this.sprite.texture = texture; //textureCollection.get(texture);
    }
};
