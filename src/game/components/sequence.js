"use strict";

var Pattern = require('../patterns/pattern'),
    collection = require('../objectCollection');

var player = null;

module.exports = {
    initialize: function (element) {
        if (player === null) {
            //TODO might run into issue with this if the player is instantiated after the enemy pools
            //it may be a better idea to add a attachToPlayer method or something
            player = collection.getArray('player')[0];
        }

        element.pattern = new Pattern(element, {
            x: 0,
            y: 0
        });

        element.pattern.setDestination(player);

        element.sequence = null;
    },
    update: function (element, dt) {
        if (element.sequence !== null) {
            element.pattern.update();
            element.sequence.update(element.pattern, dt);
        }
    }
};
