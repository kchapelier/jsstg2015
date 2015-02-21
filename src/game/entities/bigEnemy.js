"use strict";

var GameObject = require('../../lib/quick-and-dirty-gameobject');

module.exports = GameObject.createFactory(
    require('../components/bigEnemyBehavior'),
    require('../components/position'),
    require('../components/bigEnemyRender'),
    require('../components/sequence'),
    require('../components/explosive')
);
