import { Vector2D } from "./MathFunctions.js";
import mode from "./mode.js" 

const defaultOptions = {
    max: 100,
    speed: 60,
    spread: 100,
    interval: 5,
    mode: "random",
}

const ParticleSystem = (function(window) {

    function ParticleEngine(options = defaultOptions) {
        this.max = options.max;
        this.mode = options.mode;
        this.speed = options.speed;
        this.spread = options.spread;
        this.interval = options.interval
        this.context;
        this.particles = [];
    };

    function Particle(x, y, width, height) {
        this.startPosition = new Vector2D(x, y);
        this.lastPosition = this.startPosition;
        this.direction;
        this.width = width;
        this.height = height;
        this.spawnTime = Date.now();
    };

    ParticleEngine.prototype.setup = function(context, options = {}) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;
        
        Object.assign(_pEngine, options);
        
        _pEngine.context = context;
        
        return _pEngine;
    }

    ParticleEngine.prototype.draw = function(x, y) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;
        const ctx = _pEngine.context;
        const p = new Particle(x, y, 10, 10)

        switch (_pEngine.mode) {
            case "random":
                p.direction = mode.randomFire();
                break;
            case "radial":
                p.direction = mode.radialFire(_pEngine.interval);
                break;
        }

        if (_pEngine.particles.length < _pEngine.max) {
            _pEngine.particles.push(p);
        }

        _pEngine.particles.forEach(particle => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(particle.lastPosition.x, particle.lastPosition.y, particle.width / 2, 0, 2 * Math.PI);
            ctx.fill();
            ctx.restore();
        });
    }

    ParticleEngine.prototype.update = function(deltaTime = 1/60) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;

        _pEngine.particles.forEach(particle => {
            const currentPosition = new Vector2D(particle.lastPosition.x, particle.lastPosition.y);
            const velocity = new Vector2D(particle.direction.x * _pEngine.speed * deltaTime, particle.direction.y * _pEngine.speed * deltaTime);
            const dist = Vector2D.distance(particle.startPosition, currentPosition);

            currentPosition.add(velocity);

            
            particle.lastPosition = currentPosition;

            if (dist >= _pEngine.spread) {
                _pEngine.particles.splice(_pEngine.particles.indexOf(particle), 1);
            }
        })
    }

    return window.pEngine = new ParticleEngine();

}(window));

export default ParticleSystem;