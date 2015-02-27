"use strict";

var localForage = require('localforage');

var highScores = {
    get: function (callback) {
        localForage.getItem('scores', function (err, scores) {
            scores = scores || {};

            if (!scores.normal) {
                scores.normal = 0;
            }

            if (callback) {
                callback(scores);
            }
        });
    },
    set: function (gameType, score, callback) {
        highScores.get(function (scores) {
            scores[gameType] = Math.max(score, scores[gameType]);
            localForage.setItem('scores', scores);

            if (callback) {
                callback(scores);
            }
        });
    }
};

module.exports = highScores;
