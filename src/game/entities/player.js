"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject');

module.exports = GameObject.createFactory(
    require('../components/playerInput'),
    require('../components/playerWeapon'),
    require('../components/playerConstraint'),
    require('../components/position'),
    require('../components/playerRender')
);
