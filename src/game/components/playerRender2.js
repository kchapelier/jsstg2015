"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite'),
    textureHitbox = textureCollection.get('hitbox');

module.exports = {
    initializeRender: function () {
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor = new PIXI.Point(0.5, 0.5);
        this.hitbox = new PIXI.Sprite(textureHitbox);
        this.hitbox.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (dt) {
        var alpha = (this.invicibilityTimer > 0 ? 0.5 : 1.0);
        this.sprite.alpha = alpha;

        this.sprite.x = Math.round(this.x);
        this.sprite.y = Math.round(this.y);
        this.hitbox.x = Math.round(this.x);
        this.hitbox.y = Math.round(this.y);

        if (this.focused) {
            this.hitbox.alpha = alpha;
        } else {
            this.hitbox.alpha = 0;
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
