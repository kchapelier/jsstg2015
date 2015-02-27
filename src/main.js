"use strict";

var game = require('./game/game'),
    fontLoader = require('./lib/fontLoader');

module.exports = function () {
    fontLoader(['Economica:700,400'], function () {
        game.initialize();
    });
};
