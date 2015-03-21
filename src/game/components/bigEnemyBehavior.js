"use strict";

var objectCollection = require('./../objectCollection');
var bonusHit = 10,
    bonusKill = 10;

module.exports = {
    hitboxRadius: 20,
    life: null,
    totalLife: null,
    invincible: false,
    takeDamage: function (damage) {
        var bonus = 0;

        if (!this.invincible && this.life >= 0) {
            // prevent healing with negative value
            damage = Math.max(0, damage);

            this.life -= damage;
            bonus += damage * bonusHit;

            if (this.life < 0) {
                this.explode();
                this.cancelBullets();

                objectCollection.remove('enemy', this);
                bonus += this.totalLife * bonusKill;
            }
        }

        return bonus;
    }
};
