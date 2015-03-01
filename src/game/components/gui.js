"use strict";

var PIXI = require('pixi.js'),
    toRoman = require('roman-numerals').toRoman,
    numeral = require('numeral'),
    collection = require('./../objectCollection'),
    enemyArray = collection.getArray('enemy');

var textLives = 'Lives: ',
    textLastLife = 'Last life',
    textDead = 'Dead',
    textScore = 'Score: ',
    textHighScore = 'HighScore: ',
    textGraze = 'Graze: ',
    textStyle = {
        font: '400 15px Economica',
        fill: 'white'
    },
    titleStyle = {
        font: '700 45px Economica',
        fill: 'black'
    },
    subtitleStyle = {
        font: '400 14px Economica',
        fill: 'black'
    };

var textTitle = 'IMITHE',
    textSubtitle = 'made for JS > STG 2015',
    textDirections = 'WASD, d-pad or first stick to move.\r\nX, space or button 3 to shoot.\r\nV, shift or button 6 to focus.\r\n\r\n-- PRESS SHOOT TO START --';

module.exports = {
    title: null,
    scoreText: null,
    livesText: null,
    levelText: null,
    lifeBar: null,
    lifeBarInner: null,
    initialize: function (element) {
        element.initializeGameGui();
        element.initializeMenuGui();
    },
    render: function (element, dt) {
        var displayLifeBar = false,
            ratioLifeBar = 0;

        enemyArray.every(function (enemy) {
            if (enemy.displayLifeBar) {
                displayLifeBar = true;
                ratioLifeBar = enemy.life / enemy.totalLife;
            }

            return true;
        });

        if (displayLifeBar) {
            element.lifeBar.visible = true;
            element.lifeBarInner.clear();
            element.lifeBarInner.beginFill(0xFFFF33);
            element.lifeBarInner.drawRect(0, 0, 790 * ratioLifeBar, 3);
            element.lifeBarInner.endFill();
        } else {
            element.lifeBar.visible = false;
        }
    },
    initializeMenuGui: function () {
        var titleText = new PIXI.Text(textTitle, titleStyle);
        titleText.position.x = 9;
        titleText.position.y = 10;

        var subtitleText = new PIXI.Text(textSubtitle, subtitleStyle);
        subtitleText.position.x = 10;
        subtitleText.position.y = 46;

        var titleSquare = new PIXI.Graphics();
        titleSquare.beginFill(0xFFFFFF);
        titleSquare.drawRect(0, 0, 119, 69);
        titleSquare.endFill();

        this.title = new PIXI.DisplayObjectContainer();
        this.title.position.x = 15;
        this.title.position.y = 15;
        this.title.addChild(titleSquare);
        this.title.addChild(titleText);
        this.title.addChild(subtitleText);

        this.commandsText = new PIXI.Text(textDirections, textStyle);
        this.commandsText.position.x = 15;
        this.commandsText.position.y = 485;
    },
    initializeGameGui: function () {
        this.numeralScore = numeral(0);
        this.scoreText = new PIXI.Text('', textStyle);
        this.scoreText.position.x = 15;
        this.scoreText.position.y = 30;

        this.numeralHighScore = numeral(0);
        this.highScoreText = new PIXI.Text('', textStyle);
        this.highScoreText.position.x = 800 - 15 - this.highScoreText.width;
        this.highScoreText.position.y = 30;

        this.numeralGraze = numeral(0);
        this.grazeText = new PIXI.Text('', textStyle);
        this.grazeText.position.x = 15;
        this.grazeText.position.y = 45;

        this.livesText = new PIXI.Text(textLives, textStyle);
        this.livesText.position.x = 15;
        this.livesText.position.y = 15;

        this.levelText = new PIXI.Text('', textStyle);
        this.levelText.position.x = 800 - 15 - this.levelText.width;
        this.levelText.position.y = 15;

        this.lifeBar = new PIXI.DisplayObjectContainer();
        this.lifeBar.x = 5;
        this.lifeBar.y = 5;
        this.lifeBarInner = new PIXI.Graphics();
        this.lifeBarInner.beginFill(0xFFFF88);
        this.lifeBarInner.drawRect(0, 0, 790, 3);
        this.lifeBarInner.endFill();
        this.lifeBar.addChild(this.lifeBarInner);

        this.lives = new PIXI.DisplayObjectContainer();
        this.lives.position.x = this.livesText.width + this.livesText.position.x;
        this.lives.position.y = this.livesText.position.y;
        this.lifeSquares = [];

        for (var i = 0; i < 3; i++) {
            var life = new PIXI.Graphics();
            life.beginFill(0xFFFFFF);
            life.drawRect(i * 17, 4, 12, 7);
            life.endFill();
            this.lives.addChild(life);
            this.lifeSquares.push(life);
        }
    },
    showMenuGui: function () {
        this.title.visible = true;
        this.commandsText.visible = true;

        this.levelText.visible = false;
        this.livesText.visible = false;
        this.lives.visible = false;
        this.scoreText.visible = false;
        this.highScoreText.visible = false;
        this.grazeText.visible = false;
        this.lifeBar.visible = false;
    },
    showGameGui: function () {
        this.title.visible = false;
        this.commandsText.visible = false;

        this.levelText.visible = true;
        this.livesText.visible = true;
        this.lives.visible = true;
        this.scoreText.visible = true;
        this.highScoreText.visible = true;
        this.grazeText.visible = true;
        this.lifeBar.visible = true;
    },
    bindToRenderer: function (renderer) {
        this.renderer = renderer;

        this.renderer.addElementToForeground(this.title);
        this.renderer.addElementToForeground(this.commandsText);

        this.renderer.addElementToForeground(this.levelText);
        this.renderer.addElementToForeground(this.livesText);
        this.renderer.addElementToForeground(this.lives);
        this.renderer.addElementToForeground(this.scoreText);
        this.renderer.addElementToForeground(this.highScoreText);
        this.renderer.addElementToForeground(this.grazeText);
        this.renderer.addElementToForeground(this.lifeBar);
    },
    changeLevel: function (level, levelNumber) {
        this.levelText.setText(toRoman(levelNumber) + ": " + level.name.toUpperCase());
        this.levelText.position.x = 800 - 15 - this.levelText.width;
    },
    changeLives: function (lives) {
        for (var i = 0; i < 3; i++) {
            this.lifeSquares[i].visible = (lives > i);
        }

        if (lives === 0) {
            this.livesText.setText(textLives + textLastLife);
        } else if (lives < 0) {
            this.livesText.setText(textDead);
        } else {
            this.livesText.setText(textLives);
        }
    },
    changeScore: function (score) {
        this.numeralScore.set(score);
        this.scoreText.setText(textScore + this.numeralScore.format());
    },
    changeHighScore: function (score) {
        this.numeralHighScore.set(score);
        this.highScoreText.setText(textHighScore + this.numeralHighScore.format());
        this.highScoreText.position.x = 800 - 15 - this.highScoreText.width;
    },
    changeGraze: function (graze) {
        this.numeralGraze.set(graze);
        this.grazeText.setText(textGraze + this.numeralGraze.format());
    }
};
