"use strict";

var extend = require('../../lib/extends');

var GUI = function GUI () {
    this.initializeGui();
};

GUI.prototype = extend.copy(GUI.prototype, [
    require('../components/gui')
]);

module.exports = GUI;
