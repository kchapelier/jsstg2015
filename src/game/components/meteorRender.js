"use strict";

var PIXI = require('pixi.js'),
    PixiParticle = require('./../../lib/pixiParticle'),
    textureCollection = require('./../textureCollection');

var particleTexture = textureCollection.get('particle');

var emitterDescription = {
    alpha: {
        start: 0.35,
        end: 0.40
    },
    scale: {
        start: 0.55 * 4,
        end: 0.05 * 4,
        minimumScaleMultiplier: 1
    },
    color: {
        start: '#7a5f15',
        end: '#ff6600'
    },
    speed: {
        start: 40,
        end: 280
    },
    acceleration: {
        x: 0,
        y: 0
    },
    startRotation: {
        min: 260,
        max: 280
    },
    rotationSpeed: {
        min: 0,
        max: 0
    },
    lifetime: {
        min: 0.25,
        max: 0.65
    },
    blendMode: 'screen',
    frequency: 0.0065,
    emitterLifetime: -1,
    maxParticles: 38,
    pos: {
        x: 0,
        y: 0
    },
    addAtBack: true,
    spawnType: 'point'
};

var createEmitter = function createEmitter (source) {
    var emitter = new PixiParticle.Emitter(
        source,
        [particleTexture],
        emitterDescription
    );

    emitter.emit = true;

    return emitter;
};

module.exports = {
    size: 1,
    initializeRender: function () {
        this.sprite = new PIXI.Sprite(particleTexture);
        this.sprite.alpha = 0.90;
        this.sprite.anchor = new PIXI.Point(0.5, 0.5);
        this.sprite.blendMode = PIXI.BLEND_MODES.ADD;
        this.emitterContainer = new PIXI.Container();
        this.emitter = createEmitter(this.emitterContainer);
    },
    render: function (dt) {
        this.sprite.x = this.x;
        this.sprite.y = this.y;

        this.emitter.spawnPos.x = this.x;
        this.emitter.spawnPos.y = this.y;

        this.emitter.update(dt / 1000);
    },
    setColors: function (colors) {
        this.emitter.startColor = PixiParticle.ParticleUtils.hexToRGB(colors.secondary);
        this.emitter.endColor = PixiParticle.ParticleUtils.hexToRGB(colors.primary);
    }
};
