"use strict";

var Sequence = function (operations, repeatition) {
    this.operations = operations;
    this.repeatition = repeatition;

    this.reset();
};

Sequence.prototype.operations = null;
Sequence.prototype.repeatition = null;
Sequence.prototype.timeCursor = null;
Sequence.prototype.currentOperation = null;
Sequence.prototype.currentRepeatition = null;

Sequence.prototype.update = function (pattern, dt) {
    if (this.isComplete()) {
        return false;
    }

    var complete;

    this.timeCursor += dt;

    while (!(complete = (this.currentRepeatition >= this.repeatition && this.repeatition !== 0)) && this.timeCursor >= 0) {
        this.execute(pattern, this.operations[this.currentOperation], this.timeCursor);

        this.currentOperation++;

        if (this.currentOperation >= this.operations.length) {
            this.currentOperation = 0;
            this.currentRepeatition++;
        }
    }

    return !complete;
};

Sequence.prototype.execute = function (pattern, operation, timeLag) {
    var method = operation[0],
        args = [];

    if (method === 'wait') {
        this.timeCursor -= operation[1];
    } else {
        for (var i = 1; i < operation.length; i++) {
            args.push(operation[i]);
        }

        // TODO update the generated bullet with timeLag

        pattern[method].apply(pattern, args);
    }
};

Sequence.prototype.isComplete = function () {
    return this.operations.length === 0 || (this.currentRepeatition >= this.repeatition && this.repeatition !== 0);
};

Sequence.prototype.reset = function () {
    this.timeCursor = 0;
    this.currentOperation = 0;
    this.currentRepeatition = 0;
};

module.exports = Sequence;
