"use strict";

var game = require('./game/game'),
    fontLoader = require('./lib/fontLoader');

module.exports = function () {
    game.initialize();
    //fontLoader(['Economica:700,400'], init);
};
