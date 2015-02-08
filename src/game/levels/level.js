"use strict";

var rng = require('./../../lib/rng'),
    layout = require('./layout');

module.exports = {
    createFromString: function (string) {
        console.log('---- ' + string);

        var levelRng = rng.createFromString(string);

        console.log(layout.get(levelRng));
    }
};
