"use strict";

var RandomLoopSequence = function (sequences, delayInBetween, repeatition) {
    this.sequences = sequences;
    this.currentSequence = null;
    this.previousSequence = null;
    this.delayInBetween = delayInBetween;
    this.accumulatedTime = 0;
    this.waiting = false;

    this.repeatition = repeatition;
    this.currentRepeatition = 0;
};

RandomLoopSequence.prototype.update = function (pattern, dt) {
    if (!this.isComplete()) {
        if (this.currentSequence !== null && this.sequences[this.currentSequence].isComplete()) {
            this.resetCurrentSequence();
            this.waiting = true;
            this.currentRepeatition++;
        }

        if (this.currentSequence === null) {
            do {
                this.currentSequence = Math.floor(Math.random() * this.sequences.length);
            } while (this.previousSequence === this.currentSequence && this.sequences.length > 1);
        }

        if (this.waiting) {
            this.accumulatedTime += dt;

            if (this.accumulatedTime >= this.delayInBetween) {
                this.accumulatedTime = 0;
                this.waiting = false;
            }
        } else {
            this.sequences[this.currentSequence].update(pattern, dt);
        }
    }
};

RandomLoopSequence.prototype.isComplete = function () {
    return this.sequences.length === 0 || (this.currentRepeatition >= this.repeatition && this.repeatition > 0);
};

RandomLoopSequence.prototype.resetCurrentSequence = function () {
    if (this.currentSequence !== null) {
        this.sequences[this.currentSequence].reset();
        this.previousSequence = this.currentSequence;
    }

    this.currentSequence = null;
    this.accumulatedTime = 0;
};

RandomLoopSequence.prototype.reset = function () {
    this.resetCurrentSequence();

    this.waiting = false;
    this.currentSequence = null;
    this.accumulatedTime = 0;
    this.waiting = false;
    this.currentRepeatition = 0;
    this.previousSequence = null;
};

module.exports = RandomLoopSequence;
