"use strict";

module.exports = {
    shooting: false,
    weapon: null,
    setWeapon: function (weapon) {
        this.weapon = weapon;
    },
    postUpdateWeapon: function (dt) {
        if (this.weapon && this.weapon.postUpdate) {
            this.weapon.postUpdate(this.shooting, dt);
        }
    },
    updateWeapon: function (dt) {
        if (this.weapon) {
            this.weapon.update(this.shooting, dt);
        }
    }
};
