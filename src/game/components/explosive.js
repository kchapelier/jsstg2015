"use strict";

var explosionPool = require('./../pools/explosionPool'),
    objectCollection = require('./../objectCollection');

module.exports = {
    explosionSize: 1,
    explosionColors: null,
    explode: function () {
        objectCollection.add('explosion', explosionPool.get({
            x: this.x,
            y: this.y,
            colors: this.explosionColors,
            size: this.explosionSize
        }));
    }
};
