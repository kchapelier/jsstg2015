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

console.log(level.createFromString('alpha centauri' + Math.random() * 1000000));
console.log(level.createFromString('earth' + Math.random() * 1000000));
console.log(level.createFromString('sun' + Math.random() * 1000000));
console.log(level.createFromString('venus' + Math.random() * 1000000));

loadTextures();

var init = function init () {
    var loop = new GameLoop();

    renderer.infectDom('game');

    var playerFactory = require('./game/entities/player'),
        player = playerFactory();

    var playerShotArray = objectCollection.getArray('playerShot');

    objectCollection.add('player', player);

    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);

        playerShotArray.forEach(function (shot) {
            shot.update(dt);
        });
    };

    loop.postUpdate = function (dt) {
        player.postUpdate(dt);

        playerShotArray.forEach(function playerShotArrayPostUpdate (shot) {
            shot.postUpdate(dt);
        });
    };

    loop.render = function (dt) {
        player.render(dt);

        playerShotArray.forEach(function (shot) {
            shot.render(dt);
        });

        renderer.render(dt);
    };

    loop.start();
};

module.exports = function () {
    init();
};
