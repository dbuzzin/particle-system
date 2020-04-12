import { Vector2D, random, radians } from "./MathFunctions.js";

const mode = (function() {

    let radialI = 0;
    let coneI = 0;

    function randomFire() {
        return Vector2D.fromAngle(radians(random(0, 360)));
    }

    function radialFire(interval = 10) {
        radialI <= 360 ? radialI += interval : radialI = 0;

        return Vector2D.fromAngle(radians(radialI));
    }

    return {
        randomFire,
        radialFire
    }
}());

export default mode;