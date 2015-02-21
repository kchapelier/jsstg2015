"use strict";

var PIXI = require('pixi.js'),
    PixiParticle = require('./../../lib/pixiParticle'),
    textureCollection = require('./../textureCollection');

var particleTexture = textureCollection.get('particle');

var emitterDescription = {
    "alpha": {
        "start": 0.66,
        "end": 0.52
    },
    "scale": {
        "start": 4,
        "end": 0.001,
        "minimumScaleMultiplier": 1
    },
    "color": {
        "start": "#474a15",
        "end": "#ff1212"
    },
    "speed": {
        "start": 50,
        "end": 80
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "startRotation": {
        "min": 0,
        "max": 0
    },
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 2.5,
        "max": 3
    },
    "blendMode": "screen",
    "frequency": 0.05,
    "emitterLifetime": 0.4,
    "maxParticles": 80,
    "pos": {
        "x": 50,
        "y": 0
    },
    "addAtBack": false,
    "spawnType": "burst",
    "particlesPerWave": 10,
    "particleSpacing": 0,
    "angleStart": 0
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
    size: 1,
    initialize: function (element) {
        element.emitterContainer = new PIXI.DisplayObjectContainer();
        element.emitter = createEmitter(element.emitterContainer);
    },
    render: function (element, dt) {
        element.emitter.spawnPos.x = element.x;
        element.emitter.spawnPos.y = element.y;

        element.emitter.update(dt / 1000);
    },
    setColors: function (colors) {
        this.emitter.startColor = PixiParticle.ParticleUtils.hexToRGB(colors.secondary);
        this.emitter.endColor = PixiParticle.ParticleUtils.hexToRGB(colors.primary);
    }
};
