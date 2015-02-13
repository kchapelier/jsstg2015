"use strict";

// TODO for future versions : fullscreen support

var PIXI = require('pixi.js'),
    baseWidth = 800, //window.innerWidth,
    baseHeight = 600; //window.innerHeight;

var renderer = new PIXI.WebGLRenderer(baseWidth, baseHeight),
    stage = new PIXI.Stage(0x000000),
    backgroundLayer = new PIXI.DisplayObjectContainer(),
    middleLayer = new PIXI.DisplayObjectContainer(),
    foregroundLayer = new PIXI.DisplayObjectContainer();

stage.addChild(backgroundLayer);
stage.addChild(middleLayer);
stage.addChild(foregroundLayer);

module.exports = {
    screenWidth: baseWidth,
    screenHeight: baseHeight,
    infectDom: function (domElement) {
        if (typeof domElement === 'string') {
            domElement = document.getElementById(domElement);
        }

        domElement.appendChild(renderer.view);
    },
    addElement: function (element) {
        middleLayer.addChild(element);
    },
    removeElement: function (element) {
        middleLayer.removeChild(element);
    },
    addElementToForeground: function (element) {
        foregroundLayer.addChild(element);
    },
    removeElementFromForeground: function (element) {
        foregroundLayer.removeChild(element);
    },
    addElementToBackground: function (element) {
        backgroundLayer.addChild(element);
    },
    removeElementFromBackground: function (element) {
        backgroundLayer.removeChild(element);
    },
    render: function () {
        renderer.render(stage);
    }
};
