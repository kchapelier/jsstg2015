"use strict";

var PIXI = require('pixi.js'),
    PixiParticle = require('./../../lib/pixiParticle'),
    textureCollection = require('./../textureCollection');

var particleTexture = textureCollection.get('particle');

var emitterDescription = {
    "alpha": {
        "start": 0.35,
        "end": 0.40
    },
    "scale": {
        "start": 0.55 * 4,
        "end": 0.05 * 4,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#7a5f15",
        "end": "#ff6600"
    },
    "speed": {
        "start": 50,
        "end": 350
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "startRotation": {
        "min": 260,
        "max": 280
    },
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 0.25,
        "max": 0.65
    },
    "blendMode": "screen",
    "frequency": 0.006,
    "emitterLifetime": -1,
    "maxParticles": 40,
    "pos": {
        "x": 0,
        "y": 0
    },
    "addAtBack": true,
    "spawnType": "point"
};


var createEmitter = function createEmitter (source) {
    var emitter = new PixiParticle.Emitter(
        source,
        [particleTexture],
        emitterDescription
    );

    // Start emitting
    emitter.emit = true;

    return emitter;
};


module.exports = {
    size : 1,
    initialize: function (element) {
        element.sprite = new PIXI.Sprite(particleTexture);
        element.sprite.alpha = 0.90;
        element.sprite.anchor = new PIXI.Point(0.5, 0.5);
        element.sprite.blendMode = PIXI.blendModes.ADD;
        element.emitterContainer = new PIXI.DisplayObjectContainer();
        element.emitter = createEmitter(element.emitterContainer);
    },
    render: function (element, dt) {
        element.sprite.x = element.x;
        element.sprite.y = element.y;

        element.emitter.spawnPos.x = element.x;
        element.emitter.spawnPos.y = element.y;

        element.emitter.update(dt / 1000);
    },
    setColors: function (colors) {
        this.emitter.startColor = PixiParticle.ParticleUtils.hexToRGB(colors.secondary);
        this.emitter.endColor = PixiParticle.ParticleUtils.hexToRGB(colors.primary);
    }
};
