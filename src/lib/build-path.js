"use strict";

var euclideanDistance = require('mathp/functions/euclideanDistance'),
    lerp = require('mathp/functions/lerp'),
    bezier = require('bezier');

var preparePoints = function preparePoints (points, kneel) {
    var length = points.length,
        result = [];

    for (var i = 0; i < length; i++) {
        if (i === 0 || i === length - 1) {
            result.push({
                type: 'static',
                x: points[i].x,
                y: points[i].y
            });
        } else {
            var startPoint = {
                type: 'static',
                x: lerp(points[i].x, points[i - 1].x, kneel),
                y: lerp(points[i].y, points[i - 1].y, kneel)
            };

            var kneelPoint = {
                type: 'kneel',
                x: points[i].x,
                y: points[i].y
            };

            var endPoint = {
                type: 'static',
                x: lerp(points[i].x, points[i + 1].x, kneel),
                y: lerp(points[i].y, points[i + 1].y, kneel)
            };

            result.push(startPoint);
            result.push(kneelPoint);
            result.push(endPoint);
        }
    }

    return result;
};

// port of http://malczak.info/blog/quadratic-bezier-curve-length/
var approximateQuadratic2dBezierLength = function approximateQuadratic2dBezierLength (p0, p1, p2) {
    var ax = p0.x - 2 * p1.x + p2.x,
        ay = p0.y - 2 * p1.y + p2.y,
        bx = 2 * p1.x - 2 * p0.x,
        by = 2 * p1.y - 2 * p0.y;

    var A = 4 * (ax * ax + ay * ay),
        B = 4 * (ax * bx + ay * by),
        C = bx * bx + by * by;

    var Sabc = 2 * Math.sqrt(A + B + C),
        A_2 = Math.sqrt(A),
        A_32 = 2 * A * A_2,
        C_2 = 2 * Math.sqrt(C),
        BA = B / A_2;

    return (
        A_32 * Sabc +
        A_2 * B * (Sabc - C_2) +
        (4 * C * A - B * B) * Math.log((2 * A_2 + BA + Sabc) / (BA + C_2))
        ) / (4 * A_32);
};

var createPath = function createPath (preparedPoints, resolution) {
    var length = preparedPoints.length,
        result = [],
        previous,
        current,
        next,
        segmentLength,
        pointsNumber,
        i,
        k;

    for (i = 1; i < length; i++) {
        current = preparedPoints[i];

        if (current.type === 'static') {
            previous = preparedPoints[i - 1];

            segmentLength = euclideanDistance(previous.x, previous.y, current.x, current.y);

            pointsNumber = Math.ceil(segmentLength / resolution);

            for (k = 0; k < pointsNumber; k++) {
                result.push({
                    x: lerp(previous.x, current.x, k / pointsNumber),
                    y: lerp(previous.y, current.y, k / pointsNumber)
                });
            }
        } else {
            previous = preparedPoints[i - 1];
            next = preparedPoints[i + 1];

            segmentLength = approximateQuadratic2dBezierLength(previous, current, next);

            pointsNumber = Math.ceil(segmentLength / resolution);

            var xs = [previous.x, current.x, next.x],
                ys = [previous.y, current.y, next.y];

            for (k = 0; k < pointsNumber; k++) {
                result.push({
                    x: bezier(xs, k / pointsNumber),
                    y: bezier(ys, k / pointsNumber)
                });
            }

            i++;
        }
    }

    return result;
};

module.exports = function (points, kneel, resolution) {
    return createPath(preparePoints(points, kneel), resolution);
};
