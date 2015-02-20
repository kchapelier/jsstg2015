"use strict";

var GameLoop = require('migl-gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    objectCollection = require('./game/objectCollection'),
    textureCollection = require('./game/textureCollection');

var loadTextures = function loadTextures () {
    textureCollection.load('particle', 'particles/particle.png');
    textureCollection.load('particle2', 'particles/particle2.png');
    textureCollection.load('player-sprite', 'entities/placeholder.png');
    textureCollection.load('enemy-sprite', 'entities/placeholder.png');
    textureCollection.load('hitbox', 'entities/hitbox.png');
    textureCollection.load('player-bullet', 'entities/player-bullet.png');
};

loadTextures();

var init = function init () {
    var loop = new GameLoop();

    renderer.infectDom('game');

    var playerFactory = require('./game/entities/player'),
        player = playerFactory({
            x: 400,
            y: 500
        });

    objectCollection.add('player', player);

    var playerShotArray = objectCollection.getArray('playerShot'),
        enemyShotArray = objectCollection.getArray('enemyShot'),
        meteorArray = objectCollection.getArray('meteor'),
        enemyArray = objectCollection.getArray('enemy');

    var level = require('./game/levels/level');
    var l = level.createFromString('test' + (Math.random() * 200000));
    var field = l.fields[2];

    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);
        field.update(dt);

        var updateElement = function updateElement (element) {
            element.update(dt);
        };

        playerShotArray.forEach(updateElement);
        enemyShotArray.forEach(updateElement);
        enemyArray.forEach(updateElement);
        meteorArray.forEach(updateElement);
    };

    loop.postUpdate = function (dt) {
        player.postUpdate(dt);

        var postUpdateElement = function postUpdateElement (element) {
            element.postUpdate(dt);
        };

        playerShotArray.forEach(postUpdateElement);
        enemyShotArray.forEach(postUpdateElement);
        enemyArray.forEach(postUpdateElement);
        meteorArray.forEach(postUpdateElement);
    };

    loop.render = function (dt) {
        player.render(dt);

        var renderElement = function renderElement (element) {
            element.render(dt);
        };

        playerShotArray.forEach(renderElement);
        enemyShotArray.forEach(renderElement);
        enemyArray.forEach(renderElement);
        meteorArray.forEach(renderElement);

        renderer.render(dt);
    };

    loop.start();
};

module.exports = function () {
    init();
};
