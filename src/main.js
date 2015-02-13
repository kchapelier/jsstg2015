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
    var meteorPool = require('./game/pools/meteorPool');

    var meteorStage = {
        initialize: function (level) {
            this.level = level;
            this.generosity = this.level.rng.randomBounded(0.5, 1.5);
            this.speed = this.level.rng.randomBounded(0.5, 1.5);
            this.duration = this.level.rng.randomBounded(0.5, 1.5);
            this.deviation = this.level.rng.randomBounded(-0.5, 0.5);
        },
        update: function (dt) {
            if (Math.random() < 0.005 * dt * this.generosity) {
                var size = 1 + Math.pow(Math.random(), 2) * 4;

                objectCollection.add('meteor', meteorPool.get({
                    x: -100 + Math.random() * 1000,
                    y: -200 + Math.random() * 100,
                    speed: (200 + Math.random() * 150) * this.speed / size,
                    size: size,
                    colors: this.level.colors,
                    directionIntent: {
                        x: Math.random() * this.deviation,
                        y: 1
                    }
                }));
            }
        }
    };

    meteorStage.initialize(l);

    var loop = new GameLoop();

    renderer.infectDom('game');

    var playerFactory = require('./game/entities/player'),
        player = playerFactory();

    var playerShotArray = objectCollection.getArray('playerShot'),
        meteorArray = objectCollection.getArray('meteor');

    objectCollection.add('player', player);



    loop.update = function (dt) {
        input.update(dt);
        player.update(dt);

        meteorStage.update(dt);

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
