"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-bullet2');

module.exports = {
    angle: 0,
    initializeRender: function () {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function () {
        this.sprite.rotation = -this.angle;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
    },
    setTexture: function (texture) {
        this.sprite.texture = texture; //textureCollection.get(texture);
    }
};
