"use strict";

var PIXI = require('pixi.js'),
    PixiParticle = require('./../../lib/pixiParticle'),
    textureCollection = require('./../textureCollection');

var particleTexture = textureCollection.get('particle');

var explosionDescription = {
    alpha: {
        start: 0.66,
        end: 0.32
    },
    scale: {
        start: 4,
        end: 0.001,
        minimumScaleMultiplier: 1
    },
    color: {
        start: '#474a15',
        end: '#ff1212'
    },
    speed: {
        start: 40,
        end: 45
    },
    acceleration: {
        x: 0,
        y: 0
    },
    startRotation: {
        min: 0,
        max: 0
    },
    rotationSpeed: {
        min: 0,
        max: 0
    },
    lifetime: {
        min: 2.5,
        max: 3
    },
    blendMode: 'screen',
    frequency: 0.05,
    emitterLifetime: 0.4,
    maxParticles: 80,
    pos: {
        x: 50,
        y: 0
    },
    addAtBack: false,
    spawnType: 'burst',
    particlesPerWave: 10,
    particleSpacing: 0,
    angleStart: 0
};

var cancellationDescription = {
    alpha: {
        start: 1,
        end: 0.2
    },
    scale: {
        start: 1.5,
        end: 1,
        minimumScaleMultiplier: 1
    },
    color: {
        start: '#474a15',
        end: '#ff1212'
    },
    speed: {
        start: 1,
        end: 3
    },
    acceleration: {
        x: 0,
        y: 0
    },
    startRotation: {
        min: 0,
        max: 0
    },
    rotationSpeed: {
        min: 0,
        max: 0
    },
    lifetime: {
        min: 1.5,
        max: 2
    },
    blendMode: 'screen',
    frequency: 0.02,
    emitterLifetime: 0.5,
    maxParticles: 2,
    pos: {
        x: 50,
        y: 0
    },
    addAtBack: false,
    spawnType: 'burst',
    particlesPerWave: 2,
    particleSpacing: 0,
    angleStart: 0
};

var createEmitter = function createEmitter (source) {
    var emitter = new PixiParticle.Emitter(
        source,
        [particleTexture],
        explosionDescription
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
    },
    setType: function (type) {
        var config = type === 'cancellation' ? cancellationDescription : explosionDescription;

        this.emitter.init([particleTexture], config);
    }
};
