"use strict";

var extend = require('../../lib/extends');

var MissileWeapon = require('./../components/weapons/rotatingOptions');

var Player = function Player () {
    this.initializeRender();
    this.initializePosition();

    this.setWeapon(new MissileWeapon(this));
};

Player.prototype = extend.copy(Player.prototype, [
    {
        life: null,
        invincible: false,
        invicibilityDuration: 1250,
        invicibilityTimer: 0,
        grazeBoxWidth: 18,
        hitboxRadius: 4,
        reset: function () {
            this.life = 3;
            this.invincible = false;
            this.x = 400;
            this.y = 500;
        },
        postUpdate: function (dt) {
            this.postUpdateWeapon(dt);
        },
        update: function (dt) {
            if (this.invicibilityTimer > 0) {
                this.invicibilityTimer -= dt;
            }

            this.updateInput(dt);
            this.updatePosition(dt);
            this.updateConstraint(dt);
            this.updateWeapon(dt);
        },
        takeDamage: function (damage) {
            if (!this.invincible) {
                if (this.invicibilityTimer <= 0) {
                    // prevent healing with negative value
                    damage = Math.max(0, damage);

                    this.life -= damage;
                    this.invicibilityTimer = this.invicibilityDuration;

                    return true;
                }
            }

            return false;
        }
    },
    require('../components/playerInput2'),
    require('../components/position2'),
    require('../components/playerConstraint2'),
    require('../components/playerRender2'),
    require('../components/playerWeapon')
]);

module.exports = Player;
