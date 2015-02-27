"use strict";

//TODO "main menu"
//TODO enemy and player sprite (?)
//TODO in-between level animation

var GameLoop = require('migl-gameloop'),
    input = require('./input'),
    renderer = require('./renderer'),
    sound = require('./sound'),
    highScores = require('./highscores'),
    objectCollection = require('./objectCollection'),
    textureCollection = require('./textureCollection');

var loadSounds = function loadSounds () {
    sound.load('hit1', 'sfx/ld31-hit1', 1);
    sound.load('hit2', 'sfx/ld31-hit2', 1);
    sound.load('dissonant1', 'sfx/ld31-dissonant1');
    sound.load('dissonant2', 'sfx/ld31-dissonant2');
    sound.load('dissonant3', 'sfx/ld31-dissonant3');
    sound.load('dissonant4', 'sfx/ld31-dissonant4');
};

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
    var Level = require('./levels/level'),
        levelInstance = Level.createFromString('some level' + (Math.random() * 2000000));

    levelInstance.reset();

    //console.log('generate level', levelInstance.rng.seed, levelInstance.rng.seedSource);

    return levelInstance;
};

var setupPoolFreeing = function () {
    var enemyShotPool = require('./pools/enemyShotPool'),
        playerShotPool = require('./pools/playerShotPool'),
        meteorPool = require('./pools/meteorPool'),
        explosionPool = require('./pools/explosionPool'),
        bigEnemyPool = require('./pools/bigEnemyPool');

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
    var playerFactory = require('./entities/player'),
        backgroundFactory = require('./entities/background'),
        guiFactory = require('./entities/gui'),
        background = backgroundFactory(),
        player = playerFactory(),
        gui = guiFactory();

    var loop = new GameLoop();

    //TODO should be ported directly to gameloop
    var visibilityChangeHandler = function () {
        if (!!document.hidden) {
            loop.stop();
        } else {
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

    var inGame = false,
        levelNumber = 0,
        level = null,
        score = 0,
        highScore = 0,
        graze = 0;

    var incrementScore = function incrementScore (increment) {
        score += increment;

        gui.changeScore(score);

        if (highScore < score) {
            highScore = score;
            gui.changeHighScore(highScore);
        }
    };

    var showMenu = function () {
        //TODO add a method on migl-input to clear the inputs
        input.currentInput = {};
        input.activeCommands = [];

        objectCollection.removeAll('playerShot');
        objectCollection.removeAll('enemyShot');
        objectCollection.removeAll('enemy');
        objectCollection.removeAll('meteor');
        //objectCollection.removeAll('explosion'); they bug out for some reason, TODO at a later date

        gui.showMenuGui();
        player.hide();

        inGame = false;
    };

    var resetGame = function resetGame () {
        highScores.set('normal', highScore);
        score = 0;
        graze = 0;
        levelNumber = 1;
        level = loadNewLevel(levelNumber);
        player.reset();
        player.show();

        gui.showGameGui();

        gui.changeLevel(level, levelNumber);
        gui.changeScore(score);
        gui.changeHighScore(highScore);
        gui.changeGraze(graze);
        gui.changeLives(player.life);

        inGame = true;
    };

    showMenu();

    highScores.get(function (scores) {
        highScore = scores.normal;
        gui.changeHighScore(highScore);
    });

    loop.update = function (dt) {
        input.update(dt);

        if (inGame) {
            player.update(dt);
            if (!level.update(dt)) {
                levelNumber++;
                level = loadNewLevel(levelNumber);
                gui.changeLevel(level, levelNumber);
            }
        } else {
            if (input.currentInput.SHOOT) {
                resetGame();
            }
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

                        if (player.life < 0) {
                            setTimeout(showMenu, 1000);
                        }
                    }
                } else if (euclideanDistance < playerGrazeBoxWidth && !shot.grazed) {
                    shot.grazed = true;
                    graze += 1;
                    gui.changeGraze(graze);

                    incrementScore(5);

                    sound.play('hit1');
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

                        if (player.life < 0) {
                            setTimeout(resetGame, 1000);
                        }
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

                        var bonusScore = enemy.takeDamage(1);
                        incrementScore(bonusScore);

                        sound.play('hit2');
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

var game = {
    initialize: function () {
        loadSounds();
        loadTextures();
        init();
    }
};

module.exports = game;
