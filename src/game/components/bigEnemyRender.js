"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite');

module.exports = {
    displayLifeBar: false,
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
        element.lifeBar = new PIXI.DisplayObjectContainer();
        element.lifeBar.x = 5;
        element.lifeBar.y = 5;
        element.lifeBarInner = new PIXI.Graphics();
        element.lifeBarInner.beginFill(0xFFFF88);
        element.lifeBarInner.drawRect(0, 0, 790, 3);
        element.lifeBarInner.endFill();
        element.lifeBar.addChild(element.lifeBarInner);
    },
    render: function (element, dt) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;

        if (element.displayLifeBar) {
            element.lifeBar.visible = true;
            element.lifeBarInner.clear();
            element.lifeBarInner.beginFill(0xFFFF33);
            element.lifeBarInner.drawRect(0, 0, 790 * (element.life / element.totalLife), 3);
            element.lifeBarInner.endFill();
        } else {
            element.lifeBar.visible = false;
        }
    }
};
