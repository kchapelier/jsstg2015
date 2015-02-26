"use strict";

var localForage = require('localforage');

var highScores = {
    get: function (callback) {
        localForage.getItem('scores', function (err, scores) {
            scores = scores || {};

            if (!scores.normal) {
                scores.normal = 0;
            }

            callback(scores);
        });
    },
    set: function (gameType, score, callback) {
        highScores.get(function (scores) {
            scores[gameType] = Math.max(score, scores[gameType]);
            localForage.setItem('scores', scores);
            callback(scores);
        });
    }
};

module.exports = highScores;
