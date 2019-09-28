"use strict";

var extend = require('../../lib/extends');

var Meteor = function Meteor () {
    this.initializeRender();
    this.initializePosition();
};

Meteor.prototype = extend.copy(Meteor.prototype, [
    {
        postUpdate: function(dt) {
            this.postUpdateConstraint(dt);
        },
        update: function(dt) {
            this.updatePosition(dt);
        }
    },
    require('../components/position2'),
    require('../components/meteorRender'),
    require('../components/meteorConstraint')
]);

module.exports = Meteor;
