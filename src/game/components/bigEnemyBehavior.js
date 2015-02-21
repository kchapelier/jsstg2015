"use strict";

var objectCollection = require('./../objectCollection');

module.exports = {
    hitboxRadius: 20,
    life: null,
    invincible: false,
    takeDamage: function (damage) {
        if (!this.invincible) {
            // prevent healing with negative value
            damage = Math.max(0, damage);

            this.life -= damage;

            if (this.life <= 0) {
                this.explode();

                objectCollection.remove('enemy', this);
            }
        }
    }
};
