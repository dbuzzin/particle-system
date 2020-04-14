function Vector2D(x, y) {
    this.x = x;
    this.y = y;
}

Vector2D.fromAngle = function(radians) {
    return new Vector2D(Math.cos(radians), Math.sin(radians));
}

Vector2D.getAngle = function(v1, v2) {
    return Math.atan2(v2.y - v1.y, v2.x - v1.x);
}

Vector2D.distance = function(v1, v2) {
    return Math.hypot(v2.x - v1.x, v2.y - v1.y);
}

Vector2D.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
}

Vector2D.prototype.divide = function(v) {
    if (v instanceof Vector2D) {
        if (v.x !== 0) this.x /= v.x;
        if (v.x !== 0) this.y /= v.y;
    }
    else {
        if (v !== 0) {
            this.x /= v;
            this.y /= v;
        }
    }
    return this;
}

Vector2D.prototype.magnitude = function() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
}
 
Vector2D.prototype.normalize = function() {
    this.divide(this.magnitude(this));

    return this;
}

Vector2D.prototype.getDirection = function() {
    return Math.atan2(this.y, this.x);
}

export function random(type = "int", ...values) {
    if(values.length === 2) {
        if (type === "float" && values[0] < 0) {
            return Math.random() * (values[1] - values[0] + values[1]) + values[0];
        }
        return Math.floor(Math.random() * (values[1] - values[0])) + values[0];
    }
    
    return Math.floor(Math.random() * values[0]);
}

export function radians(angle) {
    return (angle * (Math.PI / 180));
}

export function getRandomVelocity() {
    return Math.random() * (1 - -1 + 1) + -1;
}

export { Vector2D };