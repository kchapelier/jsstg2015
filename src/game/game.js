"use strict";

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
    sound.load('hit1', 'sfx/jsstg-hit6', 0.4, false, false);
    sound.load('hit2', 'sfx/jsstg-hit5', 0.5, false, false);
    sound.load('music', 'music/jsstg-music', 1, true, true);
    sound.load('dissonant', 'sfx/ld31-dissonant2', 0.5, false, false);
};

var loadTextures = function loadTextures () {
    textureCollection.load('particle', 'particles/particle.png');
    textureCollection.load('particle2', 'particles/particle2.png');
    textureCollection.load('player-sprite', 'entities/placeholder.png');
    textureCollection.load('enemy-sprite', 'entities/placeholder2.png');
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

    return levelInstance;
};

var setupPoolFreeing = function () {
    var enemyShotPool = require('./pools/enemyShotPool'),
        playerShotPool = require('./pools/playerShotPool'),
        playerMissilePool = require('./pools/playerMissilePool'),
        meteorPool = require('./pools/meteorPool'),
        explosionPool = require('./pools/explosionPool'),
        bigEnemyPool = require('./pools/bigEnemyPool');

    objectCollection.on('remove.enemyShot', function (element) {
        enemyShotPool.free(element);
    });
    objectCollection.on('remove.playerShot', function (element) {
        playerShotPool.free(element);
    });
    objectCollection.on('remove.playerMissile', function (element) {
        playerMissilePool.free(element);
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
    var Player = require('./entities/player'),
        Background = require('./entities/background'),
        Gui = require('./entities/gui'),
        background = new Background(),
        player = new Player(),
        gui = new Gui();

    renderer.infectDom('game');
    background.bindToRenderer(renderer);
    gui.bindToRenderer(renderer);

    objectCollection.add('player', player);

    var playerShotArray = objectCollection.getArray('playerShot'),
        playerMissileArray = objectCollection.getArray('playerMissile'),
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
        graze = 0,
        pause = 0,
        speedMultiplier = 1;

    var takeDamages = function takeDamages (damage) {
        return;
        if (player.takeDamage(1)) {
            gui.changeLives(player.life);
            sound.play('dissonant');
            pause = 650;

            if (player.life < 0) {
                setTimeout(showMenu, 700);
            }
        }
    };

    var incrementGraze = function incrementGraze (increment) {
        graze += increment;
        gui.changeGraze(graze);
        sound.play('hit1');
    };

    var incrementScore = function incrementScore (increment) {
        score += increment;

        gui.changeScore(score);

        if (highScore < score) {
            highScore = score;
            gui.changeHighScore(highScore);
        }
    };

    var showMenu = function () {
        input.clearCurrentState();

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
        input.clearCurrentState();

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

    var musicPlaying = sound.play('music');

    highScores.get(function (scores) {
        highScore = scores.normal;
        gui.changeHighScore(highScore);
    });

    var loop = new GameLoop({
        update: function (dt) {
            if (pause > 0) {
                pause-=dt;
                return;
            }

            input.update(dt);

            if (inGame) {
                if (input.commands.FOCUS.active) {
                    speedMultiplier = Math.max(0.3, speedMultiplier - dt / 500);
                } else {
                    speedMultiplier = Math.min(1, speedMultiplier + dt / 700);
                }

                player.update(dt * speedMultiplier);
                if (!level.update(dt * speedMultiplier)) {
                    levelNumber++;
                    level = loadNewLevel(levelNumber);
                    gui.changeLevel(level, levelNumber);
                }
            } else {
                speedMultiplier = 1;
                if (input.commands.SHOOT.active) {
                    resetGame();
                }
            }

            var updateElement = function updateElement (element) {
                element.update(dt * speedMultiplier);
            };

            playerShotArray.forEach(updateElement);
            playerMissileArray.forEach(updateElement);
            enemyShotArray.forEach(updateElement);
            enemyArray.forEach(updateElement);
            meteorArray.forEach(updateElement);
            explosionArray.forEach(updateElement);

            //gui.update(dt * speedMultiplier);
            //background.update(dt * speedMultiplier);
        },
        postUpdate: function (dt) {
            if (pause > 0) {
                pause-=dt;
                return;
            }

            player.postUpdate(dt * speedMultiplier);

            var postUpdateElement = function postUpdateElement (element) {
                element.postUpdate(dt * speedMultiplier);
            };

            playerShotArray.forEach(postUpdateElement);
            playerMissileArray.forEach(postUpdateElement);
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
                    playerHitboxRadius = player.hitboxRadius,
                    i = 0,
                    euclideanDistance = 0;

                for (; i < enemyShotArray.length; i++) {
                    shot = enemyShotArray[i];
                    euclideanDistance = Math.sqrt(
                        Math.pow(shot.x - playerHitboxX, 2) +
                        Math.pow(shot.y - playerHitboxY, 2)
                    ) - shot.hitboxRadius - playerHitboxRadius;

                    if (euclideanDistance < 0) {
                        takeDamages(1);
                    } else if (euclideanDistance < playerGrazeBoxWidth && !shot.grazed) {
                        shot.grazed = true;
                        incrementGraze(1);
                        incrementScore(5);
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
                        takeDamages(1);
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

                            incrementScore(enemy.takeDamage(shot.damage));

                            sound.play('hit2');
                        }
                    }

                    for (i = 0; i < playerMissileArray.length; i++) {
                        shot = playerMissileArray[i];

                        if (
                            Math.abs(enemy.x - shot.x) < enemyHitboxRadius &&
                            Math.abs(enemy.y - shot.y) < enemyHitboxRadius
                        ) {
                            objectCollection.remove('playerMissile', shot);

                            incrementScore(enemy.takeDamage(shot.damage));

                            sound.play('hit2');
                        }
                    }
                }
            };

            playerShotCollisions();
            enemyShotCollisions();
            meteorCollisions();

            gui.changeScore(playerMissileArray.length);
        },
        render: function (dt) {
            player.render(dt * speedMultiplier);

            var renderElement = function renderElement (element) {
                element.render(dt * speedMultiplier);
            };

            playerShotArray.forEach(renderElement);
            playerMissileArray.forEach(renderElement);
            enemyShotArray.forEach(renderElement);
            enemyArray.forEach(renderElement);
            meteorArray.forEach(renderElement);
            explosionArray.forEach(renderElement);

            gui.render(dt * speedMultiplier);
            background.render(dt * speedMultiplier);

            renderer.render(dt * speedMultiplier);
        }
    });

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
