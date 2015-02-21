"use strict";

var PIXI = require('pixi.js'),
    PixiParticle = require('./../../lib/pixiParticle'),
    textureCollection = require('./../textureCollection');

var texture = textureCollection.get('player-sprite'),
    textureHitbox = textureCollection.get('hitbox');

var createEmitter = function createEmitter (source) {
    var emitter = new PixiParticle.Emitter(
        source,
        [texture],
        {
            "alpha": {
                "start": 0,
                "end": 0.43
            },
            "scale": {
                "start": 0.35,
                "end": 0.01,
                "minimumScaleMultiplier": 3
            },
            "color": {
                "start": "#ddff00",
                "end": "#ffffff"
            },
            "speed": {
                "start": 100,
                "end": 50
            },
            "acceleration": {
                "x": 30,
                "y": 8
            },
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.261,
                "max": 1.48
            },
            "blendMode": "normal",
            "frequency": 0.008,
            "emitterLifetime": -1,
            "maxParticles": 100,
            "pos": {
                "x": 16,
                "y": 16
            },
            "addAtBack": false,
            "spawnType": "point"
        }
    );

    // Start emitting
    emitter.emit = false;

    return emitter;
};


module.exports = {
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(texture);
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
        element.hitbox = new PIXI.Sprite(textureHitbox);
        element.hitbox.anchor = new PIXI.Point(0.5, 0.5);
        element.emitter = createEmitter(element.sprite);
    },
    render: function (element, dt) {
        var alpha = (element.invicibilityTimer > 0 ? 0.5 : 1.0);
        element.sprite.alpha = alpha;

        element.sprite.x = Math.round(element.x);
        element.sprite.y = Math.round(element.y);
        element.hitbox.x = Math.round(element.x);
        element.hitbox.y = Math.round(element.y);

        element.emitter.update(dt / 1000);

        if (element.focused) {
            element.hitbox.alpha = alpha;
        } else {
            element.hitbox.alpha = 0;
        }
    }
};
