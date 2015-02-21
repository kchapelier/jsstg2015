"use strict";

var GameLoop = require('migl-gameloop'),
    input = require('./game/input'),
    renderer = require('./game/renderer'),
    objectCollection = require('./game/objectCollection'),
    textureCollection = require('./game/textureCollection'),
    fontLoader = require('./lib/fontLoader');

var loadTextures = function loadTextures () {
    textureCollection.load('particle', 'particles/particle.png');
    textureCollection.load('particle2', 'particles/particle2.png');
    textureCollection.load('player-sprite', 'entities/placeholder.png');
    textureCollection.load('enemy-sprite', 'entities/placeholder.png');
    textureCollection.load('hitbox', 'entities/hitbox.png');
    textureCollection.load('player-bullet', 'entities/player-bullet.png');
};

loadTextures();

var setupPoolFreeing = function () {
    var enemyShotPool = require('./game/pools/enemyShotPool'),
        playerShotPool = require('./game/pools/playerShotPool'),
        meteorPool = require('./game/pools/meteorPool'),
        explosionPool = require('./game/pools/explosionPool'),
        bigEnemyPool = require('./game/pools/bigEnemyPool');

    objectCollection.on('remove.enemyShot', function (element) {
        enemyShotPool.free(element);
    });
    objectCollection.on('remove.playerShot', function (element) {
        playerShotPool.free(element);
    });
    objectCollection.on('remove.meteor', function (element) {
        meteorPool.free(element);
    });
    objectCollection.on('remove.explosion', function (element) {
        explosionPool.free(element);
    });
    objectCollection.on('remove.enemy', function (element) {
        bigEnemyPool.free(element);
    });
};

var init = function init () {
    var loop = new GameLoop();

    renderer.infectDom('game');

    var playerFactory = require('./game/entities/player'),
        player = playerFactory();

    player.reset();

    objectCollection.add('player', player);

    var playerShotArray = objectCollection.getArray('playerShot'),
        enemyShotArray = objectCollection.getArray('enemyShot'),
        meteorArray = objectCollection.getArray('meteor'),
        enemyArray = objectCollection.getArray('enemy'),
        explosionArray = objectCollection.getArray('explosion');

    setupPoolFreeing();

    var Level = require('./game/levels/level');
    var l = Level.createFromString('test' + (Math.random() * 200000));
    l.reset();

    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);
        l.update(dt);

        var updateElement = function updateElement (element) {
            element.update(dt);
        };

        playerShotArray.forEach(updateElement);
        enemyShotArray.forEach(updateElement);
        enemyArray.forEach(updateElement);
        meteorArray.forEach(updateElement);
        explosionArray.forEach(updateElement);
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
        explosionArray.forEach(postUpdateElement);

        //check collision enemyShot > player, using circle collision because it's better
        var enemyShotCollisions = function enemyShotCollisions () {
            var shot,
                playerHitboxX = player.x,
                playerHitboxY = player.y,
                playerHitboxRadius = 4,
                shotHitboxRadius = 0,
                i = 0,
                euclideanDistance = 0;

            for (; i < enemyShotArray.length; i++) {
                shot = enemyShotArray[i];
                shotHitboxRadius = shot.hitboxRadius;
                euclideanDistance = Math.sqrt(
                    Math.pow(playerHitboxX - shot.x, 2) +
                    Math.pow(playerHitboxY - shot.y, 2)
                );

                if (euclideanDistance < (shotHitboxRadius + playerHitboxRadius)) {
                    objectCollection.remove('enemyShot', shot);
                    player.takeDamage(1);
                }
            }
        };

        var meteorCollisions = function meteorCollisions () {
            var meteor,
                playerHitboxX = player.x,
                playerHitboxY = player.y,
                playerHitboxRadius = 4,
                meteorHitboxRadius = 0,
                i = 0,
                euclideanDistance = 0;

            for (; i < meteorArray.length; i++) {
                meteor = meteorArray[i];
                meteorHitboxRadius = meteor.hitboxRadius;
                euclideanDistance = Math.sqrt(
                    Math.pow(playerHitboxX - meteor.x, 2) +
                    Math.pow(playerHitboxY - meteor.y, 2)
                );

                if (euclideanDistance < (meteorHitboxRadius + playerHitboxRadius)) {
                    player.takeDamage(1);
                }
            }
        };

        //check collision playerShot > enemy, using square collision because it's faster
        var playerShotCollisions = function playerShotCollisions () {
            var shot,
                enemy,
                enemyHitboxRadius = 0,
                i,
                k;


            for (k = 0; k < enemyArray.length; k++) {
                enemy = enemyArray[k];
                enemyHitboxRadius = enemy.hitboxRadius;
                for (i = 0; i < playerShotArray.length; i++) {
                    shot = playerShotArray[i];

                    if (
                        Math.abs(enemy.x - shot.x) < enemyHitboxRadius &&
                        Math.abs(enemy.y - shot.y) < enemyHitboxRadius
                    ) {
                        objectCollection.remove('playerShot', shot);

                        enemy.takeDamage(1);
                    }
                }
            }
        };

        playerShotCollisions();
        enemyShotCollisions();
        meteorCollisions();
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
        explosionArray.forEach(renderElement);

        renderer.render(dt);
    };

    var PIXI = require('pixi.js');

    var textSample = new PIXI.Text("Pixi.js can has\nmultiline text!", { font: "35px Roboto Condensed", fill: "white" });
    textSample.position.x = 20;
    textSample.position.y = 20;

    renderer.addElementToForeground(textSample);

    loop.start();
};

module.exports = function () {
    fontLoader(['Roboto Condensed:300,400'], init);
};
