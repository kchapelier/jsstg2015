"use strict";

var extend = require('../../lib/extends');

var Background = function Background () {
    this.initializeBackground();
};

Background.prototype = extend.copy(Background.prototype, [
    require('../components/background')
]);

module.exports = Background;
