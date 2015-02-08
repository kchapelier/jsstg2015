/**
 * Example usage : node utils/wmcgen.js data/names/levels.txt > file.js
 */

"use strict";

var fs = require('fs'),
    file = process.argv.length > 2 ? process.argv[2] : null;

if (!file) {
    throw new Error('wmcgen must be given a file path');
}

fs.readFile(file, 'utf8', function (error, data) {
    generation(data);
});

var generation = function (content) {
    var names = content.toString().split('\n'),
        values = {};

    //var maxFirst = 0;
    //var maxLast = 0;
    //var maxMiddle = 0;

    names
        .filter(function (name) {
            return name.trim() !== '' && name[0] !== '#';
        })
        .forEach(function (name) {
            var previous = null,
                x, syl, syllable;

            name = name.split(' ');

            for (x = 0; x < name.length; x++) {
                syl = name[x];

                syllable = (!!values[syl] ? values[syl] : (values[syl] = {
                    value: syl,
                    acceptableAsFirst: 0,
                    acceptableAsMiddle: 0,
                    acceptableAsLast: 0,
                    chain: {}
                }));

                if (previous !== null) {
                    previous.chain[syl] = (!!previous.chain[syl] ? previous.chain[syl] + 1 : 1);
                }

                if (x === 0) {
                    syllable.acceptableAsFirst++;
                    //maxFirst = Math.max(maxFirst, syllable.acceptableAsFirst);
                }

                if (x === name.length - 1) {
                    syllable.acceptableAsLast++;
                    //maxLast = Math.max(maxLast, syllable.acceptableAsLast);
                }

                if (x > 0 && x < name.length - 1) {
                    syllable.acceptableAsMiddle++;
                    //maxMiddle = Math.max(maxMiddle, syllable.acceptableAsMiddle);
                }

                previous = syllable;
            }
        });

    //maxFirst = Math.max(1, maxFirst / 8);
    //maxLast = Math.max(1, maxLast / 8);
    //maxMiddle = Math.max(1, maxMiddle / 8);

    for (var k in values) {
        if (values.hasOwnProperty(k)) {
            var syllable = values[k],
                total = 0,
                syl;

            syllable.acceptableAsFirst = syllable.acceptableAsFirst > 0; //Math.min(1, syllable.acceptableAsFirst / maxFirst);
            syllable.acceptableAsLast = syllable.acceptableAsLast > 0; //Math.min(1, syllable.acceptableAsLast / maxLast);
            syllable.acceptableAsMiddle = syllable.acceptableAsMiddle > 0; //Math.min(1, syllable.acceptableAsMiddle / maxMiddle);

            for (syl in syllable.chain) {
                if (syllable.chain.hasOwnProperty(syl)) {
                    total += syllable.chain[syl];
                }
            }

            for (syl in syllable.chain) {
                if (syllable.chain.hasOwnProperty(syl)) {
                    syllable.chain[syl] = syllable.chain[syl] / total;
                }
            }
        }
    }

    console.log(values);
};
