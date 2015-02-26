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
        font: '400 14px Economica',
        fill: 'white'
    };

module.exports = {
    scoreText: null,
    livesText: null,
    levelText: null,
    lifeBar: null,
    lifeBarInner: null,
    initialize: function (element) {
        element.numeralScore = numeral(0);
        element.scoreText = new PIXI.Text('', textStyle);
        element.scoreText.position.x = 15;
        element.scoreText.position.y = 15;

        element.numeralHighScore = numeral(0);
        element.highScoreText = new PIXI.Text('', textStyle);
        element.highScoreText.position.x = 15;
        element.highScoreText.position.y = 60;

        element.numeralGraze = numeral(0);
        element.grazeText = new PIXI.Text('', textStyle);
        element.grazeText.position.x = 15;
        element.grazeText.position.y = 30;

        element.livesText = new PIXI.Text('', textStyle);
        element.livesText.position.x = 15;
        element.livesText.position.y = 45;

        element.levelText = new PIXI.Text('', textStyle);
        element.levelText.position.x = 800 - 15 - element.levelText.width;
        element.levelText.position.y = 15;

        element.lifeBar = new PIXI.DisplayObjectContainer();
        element.lifeBar.x = 5;
        element.lifeBar.y = 5;
        element.lifeBarInner = new PIXI.Graphics();
        element.lifeBarInner.beginFill(0xFFFF88);
        element.lifeBarInner.drawRect(0, 0, 790, 3);
        element.lifeBarInner.endFill();
        element.lifeBar.addChild(element.lifeBarInner);
    },
    update: function (element, dt) {
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
    bindToRenderer: function (renderer) {
        this.renderer = renderer;

        this.renderer.addElementToForeground(this.levelText);
        this.renderer.addElementToForeground(this.livesText);
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
        var strLives = textLives;

        if (lives > 0) {
            for (var i = 0; i < lives; i++) {
                strLives += '|';
            }
        } else if(lives === 0) {
            strLives += textLastLife;
        } else {
            strLives = textDead.toUpperCase();
        }

        this.livesText.setText(strLives);
    },
    changeScore: function (score) {
        this.numeralScore.set(score);
        this.scoreText.setText(textScore + this.numeralScore.format());
    },
    changeHighScore: function (score) {
        this.numeralHighScore.set(score);
        this.highScoreText.setText(textHighScore + this.numeralHighScore.format());
    },
    changeGraze: function (graze) {
        this.numeralGraze.set(graze);
        this.grazeText.setText(textGraze + this.numeralGraze.format());
    }
};
