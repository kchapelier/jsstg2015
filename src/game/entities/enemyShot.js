"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject');

module.exports = GameObject.createFactory(
    require('../components/position'),
    require('../components/enemyShotConstraint'),
    require('../components/enemyShotRender')
);
