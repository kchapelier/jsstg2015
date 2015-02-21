"use strict";

var collection = require('../lib/objectCollection'),
    renderer = require('./renderer');

//TODO should free the pools here

collection.on('add.player', function (element) {
    renderer.addElement(element.sprite);
    renderer.addElement(element.hitbox);
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
});

collection.on('add.enemyShot', function (element) {
    renderer.addElement(element.sprite);
});

collection.on('remove.enemyShot', function (element) {
    renderer.removeElement(element.sprite);
});




module.exports = collection;
