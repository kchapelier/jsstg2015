"use strict";

var PIXI = require('pixi.js'),
    PixiParticle = require('./../../lib/pixiParticle'),
    textureCollection = require('./../textureCollection');

var particleTexture = textureCollection.get('particle');

var emitterDescription = {
    "alpha": {
        "start": 1,
        "end": 0
    },
    "scale": {
        "start": 0.07,
        "end": 0.02,
        "minimumScaleMultiplier": 3
    },
    "color": {
        "start": "#e0e7ff",
        "end": "#dedeff"
    },
    "speed": {
        "start": 800,
        "end": 700
    },
    "acceleration": {
        "x": 0,
        "y": 0
    },
    "startRotation": {
        "min": 90,
        "max": 90
    },
    "rotationSpeed": {
        "min": 0,
        "max": 0
    },
    "lifetime": {
        "min": 1,
        "max": 3
    },
    "blendMode": "normal",
    "frequency": 0.04,
    "emitterLifetime": -1,
    "maxParticles": 60,
    "pos": {
        "x": 50,
        "y": 0
    },
    "addAtBack": true,
    "spawnType": "rect",
    "spawnRect": {
        "x": 0,
        "y": 0,
        "w": 800,
        "h": 70
    }
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
        element.emitter.spawnPos.x = 0;
        element.emitter.spawnPos.y = -80;
    },
    render: function (element, dt) {
        element.emitter.update(dt / 1000);
    },
    bindToRenderer: function (renderer) {
        this.renderer = renderer;

        this.renderer.addElementToBackground(this.emitterContainer);
    },
};
