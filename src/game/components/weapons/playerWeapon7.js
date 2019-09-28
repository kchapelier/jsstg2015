"use strict";

//trouble witches slowing circle

var collection = require('../../objectCollection'),
    enemyShotsArray = collection.getArray('enemyShot');

module.exports = {
    shooting: false,
    update: function (element, dt) {
        var shootNow = element.shooting;

        if (shootNow) {
            var relativePosX = element.x,
                relativePosY = element.y;

            for(var i = enemyShotsArray.length - 1; i >= 0; i--) {
                var shot = enemyShotsArray[i];

                var dist = Math.sqrt(Math.pow(relativePosX - shot.x, 2) + Math.pow(relativePosY - shot.y, 2));

                /*
                if (dist < 120) {
                    shot.speedMultiplier = Math.max(0.15, (shot.speedMultiplier * 0.9));
                } else {
                    shot.speedMultiplier = 1;
                }
                */

                var angle = Math.atan2(shot.directionIntent.x,shot.directionIntent.y);

                var destAngle = Math.atan2(element.x - shot.x, element.y - shot.y);
                var destAngle2 = destAngle - Math.PI * 2;

                var delta1 = angle - destAngle;
                var delta2 = angle - destAngle2;

                var finAngle;

                if (Math.abs(delta1) > Math.abs(delta2)) {
                    finAngle = angle - delta1;
                } else {
                    finAngle = angle - delta2;
                }

                shot.directionIntent.x = Math.sin(finAngle);
                shot.directionIntent.y = Math.cos(finAngle);
            }
        } else {
            for(var i = enemyShotsArray.length - 1; i >= 0; i--) {
                enemyShotsArray[i].speedMultiplier = 1;
            }
        }
    }
};
