"use strict";

var extend = require('../../lib/extends');

var PlayerMissile = function () {
    this.initializeRender();
    this.initializePosition();
};

PlayerMissile.prototype = extend.copy(PlayerMissile.prototype, [
    {
        damage: null,
        postUpdate: function (dt) {
            this.postUpdateConstraint(dt);
        },
        update: function (dt) {
            this.updatePosition(dt);
        }
    },
    require('../components/position3'),
    require('../components/playerMissileConstraint'),
    require('../components/playerShotRender2')
]);

module.exports = PlayerMissile;
