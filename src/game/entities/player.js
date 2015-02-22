"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject');

module.exports = GameObject.createFactory(
    require('../components/playerInput'),
    require('../components/playerWeapon'),
    require('../components/playerConstraint'),
    require('../components/position'),
    require('../components/playerRender'),
    {
        life: null,
        invincible: false,
        invicibilityDuration: 1250,
        invicibilityTimer: 0,
        reset: function () {
            this.life = 3;
            this.invincible = false;
            this.x = 400;
            this.y = 500;
        },
        update: function (element, dt) {
            if (element.invicibilityTimer > 0) {
                element.invicibilityTimer -= dt;
            }
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
    }
);
