"use strict";

var GameLoop = require('migl-gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    Victor = require('victor'),
    objectCollection = require('./game/objectCollection'),
    textureCollection = require('./game/textureCollection'),
    level = require('./game/levels/level');

var loadTextures = function loadTextures () {
    textureCollection.load('particle', 'particles/particle.png');
    textureCollection.load('particle2', 'particles/particle2.png');
    textureCollection.load('player-sprite', 'entities/placeholder.png');
    textureCollection.load('enemy-sprite', 'entities/placeholder.png');
    textureCollection.load('hitbox', 'entities/hitbox.png');
    textureCollection.load('player-bullet', 'entities/player-bullet.png');
};

loadTextures();

var l = level.createFromString('test' + (Math.random() * 200000));

var init = function init () {

    var loop = new GameLoop();

    renderer.infectDom('game');

    var playerFactory = require('./game/entities/player'),
        player = playerFactory({
            x : 400,
            y : 500
        });

    objectCollection.add('player', player);

    var playerShotArray = objectCollection.getArray('playerShot'),
        enemyShotArray = objectCollection.getArray('enemyShot'),
        meteorArray = objectCollection.getArray('meteor'),
        enemyArray = objectCollection.getArray('enemy');



    var BigEnemiesFields = require('./game/levels/fields/bigEnemiesField');

    var bigMonsterPool = require('./game/pools/bigEnemyPool');
    var bigMonsterField = new BigEnemiesFields(l);

    for (var i = 0; i < bigMonsterField.enemies.length; i += 1) {
        var pos = bigMonsterField.enemies[i];

        objectCollection.add('enemy', bigMonsterPool.get({
            x: pos.x,
            y: pos.y,
            speed: 0,
            directionIntent: {
                x: 0,
                y: 0
            },
            sequence: require('./game/patterns/sequences/testSequence')()
        }));
    }

    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);

        playerShotArray.forEach(function (shot) {
            shot.update(dt);
        });

        enemyShotArray.forEach(function (shot) {
            shot.update(dt);
        });

        enemyArray.forEach(function (enemy) {
            enemy.update(dt);
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

        enemyShotArray.forEach(function (shot) {
            shot.postUpdate(dt);
        });

        enemyArray.forEach(function (enemy) {
            enemy.postUpdate(dt);
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

        enemyShotArray.forEach(function (shot) {
            shot.render(dt);
        });

        enemyArray.forEach(function (enemy) {
            enemy.render(dt);
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
