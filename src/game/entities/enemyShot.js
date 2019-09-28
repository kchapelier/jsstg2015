"use strict";

var extend = require('../../lib/extends');

var EnemyShot = function EnemyShot () {
    this.initializeRender();
    this.initializePosition();
};

EnemyShot.prototype = extend.copy(EnemyShot.prototype, [
    {
        postUpdate: function (dt) {
            this.postUpdateConstraint(dt);
        },
        update: function (dt) {
            this.updatePosition(dt);
        }
    },
    require('../components/enemyShotBehavior2'),
    require('../components/position2'),
    require('../components/enemyShotConstraint2'),
    require('../components/enemyShotRender2')
]);

module.exports = EnemyShot;
