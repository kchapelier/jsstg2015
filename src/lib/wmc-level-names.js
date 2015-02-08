"use strict";

var WMC = require('./weightedMarkovChain');

var rules = {
    elementsMinNumber: 3,
    elementsMaxNumber: 9,
    elementsPositionRules: true,
    postProcess: function (values) {
        var name = values.join('');
        name = name.replace(/[^naeiuo]+$/, '');
        name = name.replace(/^[^a-z]+/, '');
        name = name.charAt(0).toUpperCase() + name.slice(1);

        return name;
    },
    validate: function (sequence) {
        var validDoubleCons = ['sh', 'ch', 'ts'];
        var regexMultipleConsonnes = /[^aeiou\-]{2,}/g; //doesn't include y on purpose
        var valid = true;

        if (sequence.length > 2) {
            var multipleConsonnes = sequence.toLowerCase().match(regexMultipleConsonnes);

            if (multipleConsonnes) {
                for (var i = 0; i < multipleConsonnes.length && valid; i++) {
                    var cons = multipleConsonnes[i];

                    if (cons.charAt(0) === 'n') {
                        cons = cons.substr(1);
                    }

                    if (cons.charAt(cons.length - 1) === 'y') {
                        cons = cons.substr(0, cons.length - 1);
                    }

                    if (cons.length > 1 && validDoubleCons.indexOf(cons) === -1) {
                        valid = false;
                    }
                }
            }
        } else {
            valid = false;
        }

        return valid;
    }
};

/* jscs: disable */

var data = {
    n: {
        value: 'n',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            a: 0.376984126984127,
            o: 0.25793650793650796,
            d: 0.027777777777777776,
            j: 0.03571428571428571,
            i: 0.09523809523809523,
            u: 0.03571428571428571,
            s: 0.003968253968253968,
            e: 0.04365079365079365,
            z: 0.011904761904761904,
            m: 0.007936507936507936,
            ou: 0.007936507936507936,
            n: 0.023809523809523808,
            b: 0.007936507936507936,
            t: 0.023809523809523808,
            k: 0.007936507936507936,
            g: 0.015873015873015872,
            r: 0.003968253968253968,
            y: 0.011904761904761904
        }
    },
    a: {
        value: 'a',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            g: 0.06119951040391677,
            s: 0.10403916768665851,
            z: 0.01835985312117503,
            k: 0.1554467564259486,
            n: 0.09057527539779682,
            i: 0.06487148102815178,
            w: 0.07221542227662178,
            r: 0.06364749082007344,
            m: 0.13953488372093023,
            h: 0.01835985312117503,
            t: 0.09179926560587515,
            a: 0.0012239902080783353,
            c: 0.0208078335373317,
            d: 0.01591187270501836,
            o: 0.009791921664626682,
            b: 0.02447980416156671,
            y: 0.02937576499388005,
            u: 0.0024479804161566705,
            j: 0.008567931456548347,
            e: 0.006119951040391677,
            p: 0.0012239902080783353
        }
    },
    g: {
        value: 'g',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            o: 0.152,
            a: 0.656,
            ou: 0.024,
            i: 0.088,
            u: 0.048,
            e: 0.016,
            y: 0.008,
            uu: 0.008
        }
    },
    o: {
        value: 'o',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            y: 0.060240963855421686,
            h: 0.028112449799196786,
            k: 0.1686746987951807,
            m: 0.11244979919678715,
            t: 0.09236947791164658,
            n: 0.09236947791164658,
            w: 0.01606425702811245,
            a: 0.004016064257028112,
            s: 0.13253012048192772,
            g: 0.04819277108433735,
            i: 0.0321285140562249,
            r: 0.0642570281124498,
            d: 0.03614457831325301,
            b: 0.04819277108433735,
            j: 0.024096385542168676,
            o: 0.01606425702811245,
            u: 0.004016064257028112,
            e: 0.008032128514056224,
            z: 0.008032128514056224,
            c: 0.004016064257028112
        }
    },
    y: {
        value: 'y',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            a: 0.624113475177305,
            o: 0.2198581560283688,
            uu: 0.06382978723404255,
            u: 0.028368794326241134,
            ou: 0.06382978723404255
        }
    },
    t: {
        value: 't',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            o: 0.2490842490842491,
            s: 0.2490842490842491,
            a: 0.3882783882783883,
            ou: 0.047619047619047616,
            e: 0.047619047619047616,
            t: 0.018315018315018316
        }
    },
    h: {
        value: 'h',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            a: 0.15570934256055363,
            i: 0.7474048442906575,
            e: 0.010380622837370242,
            o: 0.03460207612456748,
            ou: 0.01384083044982699,
            uu: 0.03460207612456748,
            y: 0.0034602076124567475
        }
    },
    s: {
        value: 's',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            h: 0.3726027397260274,
            e: 0.0684931506849315,
            u: 0.27945205479452057,
            a: 0.2356164383561644,
            s: 0.005479452054794521,
            o: 0.0136986301369863,
            ou: 0.021917808219178082,
            uu: 0.0027397260273972603
        }
    },
    i: {
        value: 'i',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            c: 0.024070021881838075,
            n: 0.1400437636761488,
            y: 0.07221006564551423,
            m: 0.12472647702407003,
            s: 0.08533916849015317,
            o: 0.024070021881838075,
            t: 0.10065645514223195,
            r: 0.061269146608315096,
            a: 0.0087527352297593,
            w: 0.03282275711159737,
            h: 0.0262582056892779,
            k: 0.087527352297593,
            b: 0.037199124726477024,
            d: 0.0262582056892779,
            i: 0.0175054704595186,
            j: 0.00437636761487965,
            z: 0.05470459518599562,
            f: 0.00437636761487965,
            g: 0.04814004376367615,
            u: 0.00437636761487965,
            ou: 0.01312910284463895,
            e: 0.002188183807439825
        }
    },
    k: {
        value: 'k',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            a: 0.43107769423558895,
            i: 0.21303258145363407,
            o: 0.08771929824561403,
            ou: 0.03759398496240601,
            u: 0.17543859649122806,
            e: 0.02756892230576441,
            y: 0.020050125313283207,
            k: 0.007518796992481203
        }
    },
    z: {
        value: 'z',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            a: 0.3333333333333333,
            u: 0.543859649122807,
            e: 0.10526315789473684,
            o: 0.017543859649122806
        }
    },
    c: {
        value: 'c',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {h: 1}
    },
    m: {
        value: 'm',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            i: 0.3188854489164087,
            a: 0.49226006191950467,
            e: 0.043343653250773995,
            b: 0.006191950464396285,
            u: 0.05263157894736842,
            o: 0.08359133126934984,
            y: 0.0030959752321981426
        }
    },
    e: {
        value: 'e',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            t: 0.15584415584415584,
            k: 0.05194805194805195,
            n: 0.23376623376623376,
            m: 0.025974025974025976,
            y: 0.05194805194805195,
            g: 0.06493506493506493,
            i: 0.03896103896103896,
            c: 0.012987012987012988,
            r: 0.05194805194805195,
            b: 0.07792207792207792,
            s: 0.03896103896103896,
            h: 0.025974025974025976,
            j: 0.012987012987012988,
            o: 0.05194805194805195,
            d: 0.05194805194805195,
            p: 0.012987012987012988,
            z: 0.025974025974025976,
            f: 0.012987012987012988
        }
    },
    d: {
        value: 'd',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            a: 0.7457627118644068,
            o: 0.11864406779661017,
            ou: 0.05084745762711865,
            e: 0.0847457627118644
        }
    },
    u: {
        value: 'u',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            g: 0.04887218045112782,
            s: 0.11654135338345864,
            y: 0.03007518796992481,
            r: 0.17293233082706766,
            n: 0.07894736842105263,
            z: 0.022556390977443608,
            t: 0.03759398496240601,
            d: 0.022556390977443608,
            u: 0.007518796992481203,
            k: 0.15413533834586465,
            m: 0.12406015037593984,
            c: 0.041353383458646614,
            w: 0.015037593984962405,
            i: 0.011278195488721804,
            o: 0.022556390977443608,
            h: 0.007518796992481203,
            j: 0.045112781954887216,
            b: 0.022556390977443608,
            e: 0.015037593984962405,
            f: 0.0037593984962406013
        }
    },
    w: {
        value: 'w',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {a: 1}
    },
    r: {
        value: 'r',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            i: 0.22580645161290322,
            y: 0.01935483870967742,
            a: 0.4838709677419355,
            o: 0.14838709677419354,
            u: 0.1032258064516129,
            e: 0.01935483870967742
        }
    },
    j: {
        value: 'j',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            ou: 0.37209302325581395,
            i: 0.5813953488372093,
            a: 0.023255813953488372,
            u: 0.023255813953488372
        }
    },
    ou: {
        value: 'ou',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            r: 0.05714285714285714,
            n: 0.11428571428571428,
            k: 0.1,
            b: 0.02857142857142857,
            d: 0.04285714285714286,
            s: 0.14285714285714285,
            g: 0.04285714285714286,
            o: 0.014285714285714285,
            z: 0.014285714285714285,
            m: 0.14285714285714285,
            t: 0.15714285714285714,
            f: 0.05714285714285714,
            c: 0.014285714285714285,
            y: 0.014285714285714285,
            e: 0.014285714285714285,
            i: 0.014285714285714285,
            j: 0.02857142857142857
        }
    },
    b: {
        value: 'b',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            u: 0.15789473684210525,
            o: 0.039473684210526314,
            a: 0.4473684210526316,
            i: 0.11842105263157894,
            ou: 0.02631578947368421,
            e: 0.21052631578947367
        }
    },
    uu: {
        value: 'uu',
        acceptableAsFirst: false,
        acceptableAsMiddle: true,
        acceptableAsLast: true,
        chain: {
            ou: 0.2727272727272727,
            s: 0.18181818181818182,
            b: 0.09090909090909091,
            k: 0.09090909090909091,
            g: 0.18181818181818182,
            j: 0.09090909090909091,
            n: 0.09090909090909091
        }
    },
    f: {
        value: 'f',
        acceptableAsFirst: true,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {u: 1}
    },
    p: {
        value: 'p',
        acceptableAsFirst: false,
        acceptableAsMiddle: true,
        acceptableAsLast: false,
        chain: {
            p: 0.5,
            o: 0.25,
            u: 0.25
        }
    }
};

/* jscs: enable */

module.exports = new WMC(rules, data);
