"use strict";

var PIXI = require('pixi.js'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite'),
    textureIndicator = textureCollection.get('indicator');

module.exports = {
    displayLifeBar: false,
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);

        //TODO move life bar to GUI
        element.lifeBar = new PIXI.DisplayObjectContainer();
        element.lifeBar.x = 5;
        element.lifeBar.y = 5;
        element.lifeBarInner = new PIXI.Graphics();
        element.lifeBarInner.beginFill(0xFFFF88);
        element.lifeBarInner.drawRect(0, 0, 790, 3);
        element.lifeBarInner.endFill();
        element.lifeBar.addChild(element.lifeBarInner);

        //TODO move enemy indicator to GUI
        element.indicator = new PIXI.Sprite(texture);
        element.indicator.anchor = new PIXI.Point(0.5, 0.5);
    },
    render: function (element, dt) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;

        element.indicator.x = element.x;
        element.indicator.y = 600 - element.indicator.width / 2;

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
