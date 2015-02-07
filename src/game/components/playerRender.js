"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite');
var textureHitbox = textureCollection.get('hitbox');

module.exports = {
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.hitbox = new PIXI.Sprite(textureHitbox);
    },
    render: function (element) {
        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
        element.hitbox.x = Math.round(element.x + 12);
        element.hitbox.y = Math.round(element.y + 12);

        if (element.focused) {
            element.hitbox.alpha = 1;
        } else {
            element.hitbox.alpha = 0;
        }
    }
};
