"use strict";

var howler = require('howler');

var dictionary = {};

module.exports = {
    load: function (id, filename, volume) {
        dictionary[id] = new howler.Howl({
            urls: ['./assets/sounds/' + filename + '.ogg', './assets/sounds/' + filename + '.wav'],
            autoplay: false,
            loop: false,
            volume: volume || 0.75
        });
    },
    get: function (id) {
        if (!!dictionary[id]) {
            return dictionary[id];
        }
    },
    play: function (id, options) {
        if (!!dictionary[id]) {
            dictionary[id].loop(options && !!options.loop);
            dictionary[id].play();
            return true;
        }

        return false;
    }
};
