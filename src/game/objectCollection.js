"use strict";

var collection = require('./../lib/objectCollection'),
    renderer = require('./renderer');

collection.on('add.player', function (element) {
    renderer.addElement(element.sprite);
    renderer.addElement(element.hitbox);

    if (element.weapon.options) {
        for(var i = 0; i < element.weapon.options.length; i++) {
            renderer.addElement(element.weapon.options[i]);
        }
    }
});

collection.on('add.playerMissile', function (element) {
    renderer.addElement(element.sprite);
});

collection.on('remove.playerMissile', function (element) {
    renderer.removeElement(element.sprite);
});

collection.on('add.playerShot', function (element) {
    renderer.addElement(element.sprite);
});

collection.on('remove.playerShot', function (element) {
    renderer.removeElement(element.sprite);
});

collection.on('add.meteor', function (element) {
    renderer.addElementToForeground(element.emitterContainer);
    renderer.addElementToForeground(element.sprite);
});

collection.on('remove.meteor', function (element) {
    renderer.removeElementFromForeground(element.emitterContainer);
    renderer.removeElementFromForeground(element.sprite);
});

collection.on('add.explosion', function (element) {
    renderer.addElementToForeground(element.emitterContainer);
});

collection.on('remove.explosion', function (element) {
    renderer.removeElementFromForeground(element.emitterContainer);
});

collection.on('add.enemy', function (element) {
    renderer.addElement(element.sprite);
    renderer.addElementToForeground(element.indicator);
});

collection.on('remove.enemy', function (element) {
    renderer.removeElement(element.sprite);
    renderer.removeElementFromForeground(element.indicator);
});

collection.on('add.enemyShot', function (element) {
    renderer.addElement(element.sprite);
});

collection.on('remove.enemyShot', function (element) {
    renderer.removeElement(element.sprite);
});




module.exports = collection;
