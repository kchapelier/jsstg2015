"use strict";

var GameLoop = require('migl-gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    Victor = require('victor'),
    objectCollection = require('./game/objectCollection'),
    textureCollection = require('./game/textureCollection'),
    level = require('./game/levels/level');

var loadTextures = function loadTextures () {
    textureCollection.load('player-sprite', 'entities/placeholder.png');
    textureCollection.load('enemy-sprite', 'entities/placeholder.png');
    textureCollection.load('hitbox', 'entities/hitbox.png');
    textureCollection.load('player-bullet', 'entities/player-bullet.png');
};



/*
console.log(level.createFromString('alpha centauri').colors);
console.log(level.createFromString('earth').colors);
console.log(level.createFromString('sun').colors);
console.log(level.createFromString('venus').colors);
*/

loadTextures();

var init = function init () {
    var meteorPool = require('./game/pools/meteorPool');

    var loop = new GameLoop();

    renderer.infectDom('game');

    var playerFactory = require('./game/entities/player'),
        player = playerFactory();

    var playerShotArray = objectCollection.getArray('playerShot'),
        meteorArray = objectCollection.getArray('meteor');

    objectCollection.add('player', player);

    for (var i = 0; i < 10; i++) {
        var size = 1 + Math.random() * 2;

        objectCollection.add('meteor', meteorPool.get({
            x: 50 + Math.random() * 700,
            y: Math.random() * 200,
            speed: (200 + Math.random() * 150) / size,
            size: size,
            directionIntent: {
                x: Math.random() * 0.2 - 0.1,
                y: 1
            }
        }));
    }

    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);

        playerShotArray.forEach(function (shot) {
            shot.update(dt);
        });

        meteorArray.forEach(function (meteor) {
            meteor.update(dt);
        });
    };

    loop.postUpdate = function (dt) {
        player.postUpdate(dt);

        playerShotArray.forEach(function playerShotArrayPostUpdate (shot) {
            shot.postUpdate(dt);
        });

        meteorArray.forEach(function (meteor) {
            meteor.postUpdate(dt);
        });
    };

    loop.render = function (dt) {
        player.render(dt);

        playerShotArray.forEach(function (shot) {
            shot.render(dt);
        });

        meteorArray.forEach(function (meteor) {
            meteor.render(dt);
        });

        renderer.render(dt);
    };

    loop.start();
};

module.exports = function () {
    init();
};
