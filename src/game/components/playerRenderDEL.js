"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite'),
    textureHitbox = textureCollection.get('hitbox');

module.exports = {
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
        element.hitbox = new PIXI.Sprite(textureHitbox);
        element.hitbox.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (element, dt) {
        var alpha = (element.invicibilityTimer > 0 ? 0.5 : 1.0);
        element.sprite.alpha = alpha;

        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
        element.hitbox.x = Math.round(element.x);
        element.hitbox.y = Math.round(element.y);

        if (element.focused) {
            element.hitbox.alpha = alpha;
        } else {
            element.hitbox.alpha = 0;
        }
    },
    show: function () {
        this.hitbox.visible = true;
        this.sprite.visible = true;
    },
    hide: function () {
        this.hitbox.visible = false;
        this.sprite.visible = false;
    }
};
