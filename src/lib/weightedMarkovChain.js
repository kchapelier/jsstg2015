"use strict";

// TODO implement starting value probability
// TODO implement backtracking for when the current element has a single element which cannot be used due to position rule
// TODO result cache to avoid repeated results
// TODO maxTries configurable in rules

var WMC = function (rules, data, unsafe) {
    this.rules = rules;
    this.data = data;
    this.setRNG();
    this.prepareData();
    this.prepareDataKeys();
    if (!unsafe) {
        this.checkData();
    }
};

WMC.prototype.rules = null;
WMC.prototype.data = null;
WMC.prototype.dataKeys = null;
WMC.prototype.rng = null;

WMC.prototype.setRNG = function (rng) {
    this.rng = rng || Math.random;
};

WMC.prototype.checkData = function () {
    var soleChildren = [],
        self = this,
        item, children, key;

    if (this.rules.elementsPositionRules) {
        for (key in this.data) {
            item = this.data[key];
            if (item.hasOwnProperty('chain')) {
                children = Object.keys(item.chain);

                if (children.length === 1 && soleChildren.indexOf(children[0]) === -1) {
                    soleChildren.push(children[0]);
                }
            }
        }

        soleChildren.forEach(function (item) {
            var element = self.data[item];

            if (!element.acceptableAsMiddle) {
                throw new Error('Weighted Markov Chain : "' + item + '" is a sole child but is not acceptableAsMiddle');
            }

            if (!element.acceptableAsLast) {
                throw new Error('Weighted Markov Chain : "' + item + '" is a sole child but is not acceptableAsLast');
            }
        });
    }
};

WMC.prototype.prepareData = function () {
    var element,
        key;

    for (key in this.data) {
        element = this.data[key];

        if (typeof element !== 'object' || !element) {
            element = {
                value: (element === null ? key : element)
            };

            this.data[key] = element;
        }

        if (!element.hasOwnProperty('value')) {
            element.value = key;
        }

        if (!element.hasOwnProperty('acceptableAsFirst')) {
            element.acceptableAsFirst = true;
        }

        if (!element.hasOwnProperty('acceptableAsLast')) {
            element.acceptableAsLast = true;
        }

        if (!element.hasOwnProperty('acceptableAsMiddle')) {
            element.acceptableAsMiddle = true;
        }
    }
};

WMC.prototype.prepareDataKeys = function () {
    this.dataKeys = Object.keys(this.data);
};

WMC.prototype.getElementsNumber = function () {
    return Math.floor(
        this.rng() * (this.rules.elementsMaxNumber - this.rules.elementsMinNumber + 1)
        + this.rules.elementsMinNumber
    );
};

WMC.prototype.postProcess = function (elements) {
    var values = elements.map(function (e) {
        return e.value;
    });

    if (typeof this.rules.postProcess === 'function') {
        values = this.rules.postProcess(values);
    }

    return values;
};

WMC.prototype.validateSequence = function (sequence) {
    var valid = true;

    if (typeof this.rules.validate === 'function') {
        valid = this.rules.validate(sequence);
    }

    return valid;
};

WMC.prototype.validateElement = function (position, maxElements, element) {
    var acceptable = true;

    if (this.rules.elementsPositionRules) {
        if (position === 0) {
            acceptable = element.acceptableAsFirst;
        } else if (position === maxElements - 1) {
            acceptable = element.acceptableAsLast;
        } else {
            acceptable = element.acceptableAsMiddle;
        }
    }

    return acceptable;
};

WMC.prototype.next = function (previousValues) {
    var value = null;

    if (previousValues && previousValues.length > 0) {
        var previous = previousValues[previousValues.length - 1];
        if (previous.hasOwnProperty('chain')) {
            var r = this.rng();
            for (var key in previous.chain) {
                r = r - previous.chain[key];

                if (r < 0) {
                    value = this.data[key];
                    break;
                }
            }
        }
    } else {
        var elements = this.dataKeys;
        value = this.data[elements[Math.floor(this.rng() * elements.length)]];
    }

    return value;
};

WMC.prototype.generateSequence = function () {
    var maxElements = this.getElementsNumber(),
        result = [],
        i, current;

    for (i = 0; i < maxElements; i++) {
        current = this.next(result);

        if (current === null) {
            // reached a dead end
            break;
        }

        if (!this.validateElement(i, maxElements, current)) {
            // retry
            i--;
            continue;
        }

        result.push(current);
    }

    return result;
};

WMC.prototype.get = function (rng) {
    var result = null,
        maxTries = 1000,
        tries = 0;

    if (rng) {
        this.setRNG(rng);
    }

    while (result === null) {
        tries++;

        if (tries > maxTries) {
            throw new Error('Weighted Markov Chain : ' + maxTries + ' iterations without any valid result.');
        }

        result = this.generateSequence();
        result = this.postProcess(result);

        if (!this.validateSequence(result)) {
            result = null;
        }
    }

    return result;
};

module.exports = WMC;
