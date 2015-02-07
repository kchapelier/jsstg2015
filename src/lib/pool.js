"use strict";

var Pool = function (name, factory, initialize, initialNumber) {
    this.name = name;
    this.factoryFunction = factory;
    this.initializeFunction = initialize;

    this.availableInstances = [];

    this.allocate(initialNumber);
};

Pool.prototype.name = null;
Pool.prototype.availableInstances = null;
Pool.prototype.factoryFunction = null;
Pool.prototype.initializeFunction = null;

Pool.prototype.allocate = function (number) {
    var i;

    for (i = 0; i < number; i++) {
        this.availableInstances.push(this.factoryFunction());
    }

    return this;
};

Pool.prototype.get = function (initializationOptions) {
    var element;

    if (this.availableInstances.length < 1) {
        this.allocate(5);
    }

    element = this.availableInstances.pop();

    this.initializeFunction(element, initializationOptions);

    return element;
};

Pool.prototype.free = function (element) {
    if (this.availableInstances.indexOf(element) === -1) {
        this.availableInstances.push(element);
    }

    return this;
};

Pool.prototype.clear = function () {
    while (this.availableInstances.length) {
        this.availableInstances.pop();
    }

    return this;
};

var poolId = 0;

module.exports = function pool (options) {
    poolId++;

    return new Pool(
        options.name ? options.name + ' (' + 'Pool #' + poolId + ')' : 'Pool #' + poolId,
        options.factory,
        options.initialize,
        options.initialNumber || 40
    );
};
