"use strict";

var PIXI = require('pixi.js');

var BackgroundShader = function () {
    PIXI.AbstractFilter.call(this);

    this.passes = [this];

    // set the uniforms
    this.uniforms = {
        screenWidth: {
            type: '1f',
            value: 0
        },
        screenHeight: {
            type: '1f',
            value: 0
        }
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',
        'uniform sampler2D uSampler;',
        'uniform float screenWidth;',
        'uniform float screenHeight;',

        'void main(void) {',
        '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
        '   //gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0, 1.0, 0.0), 0.1);',
        '   //gl_FragColor.a = .2;',
        '}'
    ];
};

BackgroundShader.prototype = Object.create(PIXI.AbstractFilter.prototype);
BackgroundShader.prototype.constructor = BackgroundShader;

Object.defineProperty(BackgroundShader.prototype, 'renderer', {
    get: function () {
        return {
            width: this.uniforms.screenWidth.value,
            height: this.uniforms.screenHeight.value
        };
    },
    set: function (value) {
        this.uniforms.screenWidth.value = value.screenWidth;
        this.uniforms.screenHeight.value = value.screenHeight;
    }
});

module.exports = BackgroundShader;
