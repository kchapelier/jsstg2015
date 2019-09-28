"use strict";

var extend = require('../../lib/extends');

var PlayerShot = function () {
    this.initializeRender();
    this.initializePosition();
};

PlayerShot.prototype = extend.copy(PlayerShot.prototype, [
    {
        damage: null,
        postUpdate: function (dt) {
            this.postUpdateConstraint(dt);
        },
        update: function (dt) {
            this.updatePosition(dt);
        }
    },
    require('../components/position2'),
    require('../components/playerShotConstraint2'),
    require('../components/playerShotRender2')
]);

module.exports = PlayerShot;
