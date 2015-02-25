"use strict";

//TODO in-between level animation

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
    textureCollection.load('indicator', 'entities/placeholder.png');
    textureCollection.load('hitbox', 'entities/hitbox.png');
    textureCollection.load('indicator', 'entities/indicator.png');
    textureCollection.load('player-bullet', 'entities/player-bullet.png');
    textureCollection.load('player-bullet2', 'entities/player-bullet2.png');
    textureCollection.load('enemy-bullet-black', 'entities/enemy-bullet-black.png');
    textureCollection.load('enemy-bullet-white', 'entities/enemy-bullet-white.png');
    textureCollection.load('enemy-bullet-combo', 'entities/enemy-bullet-combo.png');
    textureCollection.load('enemy-bullet-combo2', 'entities/enemy-bullet-combo2.png');
};

var loadNewLevel = function () {
    var Level = require('./game/levels/level'),
        levelInstance = Level.createFromString('some level' + (Math.random() * 2000000));

    levelInstance.reset();

    console.log('generate level', levelInstance.rng.seed, levelInstance.rng.seedSource);

    return levelInstance;
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
    var playerFactory = require('./game/entities/player'),
        backgroundFactory = require('./game/entities/background'),
        guiFactory = require('./game/entities/gui'),
        background = backgroundFactory(),
        player = playerFactory(),
        gui = guiFactory();

    player.reset();

    var loop = new GameLoop();

    //TODO should be ported directly to gameloop
    var visibilityChangeHandler = function () {
        if (!!document.hidden) {
            console.log('stop');
            loop.stop();
        } else {
            console.log('start');
            loop.start();
        }
    };

    document.addEventListener('visibilitychange', visibilityChangeHandler);

    renderer.infectDom('game');

    background.bindToRenderer(renderer);
    gui.bindToRenderer(renderer);

    objectCollection.add('player', player);

    var playerShotArray = objectCollection.getArray('playerShot'),
        enemyShotArray = objectCollection.getArray('enemyShot'),
        meteorArray = objectCollection.getArray('meteor'),
        enemyArray = objectCollection.getArray('enemy'),
        explosionArray = objectCollection.getArray('explosion');

    setupPoolFreeing();

    var levelNumber = 1,
        level = loadNewLevel(levelNumber),
        score = 0,
        graze = 0;

    gui.changeLevel(level, levelNumber);
    gui.changeScore(score);
    gui.changeGraze(graze);
    gui.changeLives(player.life);

    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);

        if (!level.update(dt)) {
            levelNumber++;
            level = loadNewLevel(levelNumber);
            gui.changeLevel(level, levelNumber);
        }

        var updateElement = function updateElement (element) {
            element.update(dt);
        };

        playerShotArray.forEach(updateElement);
        enemyShotArray.forEach(updateElement);
        enemyArray.forEach(updateElement);
        meteorArray.forEach(updateElement);
        explosionArray.forEach(updateElement);

        gui.update(dt);
        background.update(dt);
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
                playerGrazeBoxWidth = player.grazeBoxWidth,
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
                ) - shotHitboxRadius;

                if (euclideanDistance < playerHitboxRadius) {
                    objectCollection.remove('enemyShot', shot);
                    if (player.takeDamage(1)) {
                        gui.changeLives(player.life);
                    }
                } else if (euclideanDistance < playerGrazeBoxWidth && !shot.grazed) {
                    shot.grazed = true;
                    graze += 1;
                    score += 5;
                    gui.changeGraze(graze);
                    gui.changeScore(score);
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
                    if (player.takeDamage(1)) {
                        gui.changeLives(player.life);
                    }
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

                        score += enemy.takeDamage(1);
                        gui.changeScore(score);
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

        gui.render(dt);
        background.render(dt);

        renderer.render(dt);
    };

    loop.start();
};

module.exports = function () {
    init();
    //fontLoader(['Economica:700,400'], init);
};
