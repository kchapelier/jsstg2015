"use strict";

var objectCollection = require('./../objectCollection'),
    enemyShotPool = require('./../pools/enemyShotPool'),
    bonusHit = 10,
    bonusKill = 10;



module.exports = {
    hitboxRadius: 20,
    life: null,
    totalLife: null,
    invincible: false,
    fireDeadBullets: function () {
        var player = objectCollection.getArray('player')[0],
            dirX = player.x - this.x,
            dirY = player.y - this.y,
            dist = Math.sqrt((dirX * dirX) + (dirY * dirY));

        dirX /= dist;
        dirY /= dist;

        objectCollection.add('enemyShot', enemyShotPool.get({
            x: this.x,
            y: this.y,
            texture: 'enemy-bullet-black',
            directionIntent: {x: dirX, y: dirY},
            speed: 250
        }));
    },
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
                this.fireDeadBullets();

                objectCollection.remove('enemy', this);
                bonus += this.totalLife * bonusKill;
            }
        }

        return bonus;
    }
};
