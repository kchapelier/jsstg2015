"use strict";

var extend = function extend (basePrototype, prototypeExtensions) {
    var prototype = basePrototype || {};

    if (prototypeExtensions) {
        Object.assign.apply(Object, [prototype].concat(prototypeExtensions));
    }

    return prototype;
};

extend.copy = function (basePrototype, prototypeExtensions) {
    return extend({}, [basePrototype].concat(prototypeExtensions));
};

module.exports = extend;
