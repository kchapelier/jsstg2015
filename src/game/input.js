"use strict";

var Input = require('migl-input');

var input = new Input({
    SHOOT: {
        keys: ['<space>', 'X', '<pad1-button3>'],
        group: 'shoot'
    },
    FOCUS: {
        keys: ['<shift>', '<ctrl>', 'V', '<pad1-button6>', '<pad1-button8>'],
        group: 'focus'
    },
    UP: {
        keys: ['<up>', 'W', '<pad1-button13>', '<pad1-axis2-negative>'],
        group: 'axisV'
    },
    DOWN: {
        keys: ['<down>', 'S', '<pad1-button14>', '<pad1-axis2-positive>'],
        group: 'axisV'
    },
    LEFT: {
        keys: ['<left>', 'A', '<pad1-button15>', '<pad1-axis1-negative>'],
        group: 'axisH'
    },
    RIGHT: {
        keys: ['<right>', 'D', '<pad1-button16>', '<pad1-axis1-positive>'],
        group: 'axisH'
    }
});

input.attach();

module.exports = input;
