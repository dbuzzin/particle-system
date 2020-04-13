import { Vector2D } from "./MathFunctions.js";
import Mode from "./Mode.js" 

const defaultOptions = {
    max: 200,
    speed: 60,
    spread: 100,
    interval: 5,
    particleSize: 5,
    mode: "random",
}

const ParticleSystem = (function(window) {

    function ParticleEngine(options = defaultOptions) {
        this.max = options.max;
        this.mode = options.mode;
        this.speed = options.speed;
        this.spread = options.spread;
        this.interval = options.interval;
        this.particleSize = options.particleSize;
        this.context;
        this.particles = [];
    };

    function Particle(x, y) {
        this.startPosition = new Vector2D(x, y);
        this.lastPosition = this.startPosition;
        this.direction;
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
        const p = new Particle(x, y, 30, 30)

        switch (_pEngine.mode) {
            case "random":
                p.direction = Mode.randomFire();
                break;
            case "radial":
                p.direction = Mode.radialFire(_pEngine.interval);
                break;
        }

        if (_pEngine.particles.length < _pEngine.max) {
            _pEngine.particles.push(p);
        }

        _pEngine.particles.forEach(particle => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(particle.lastPosition.x, particle.lastPosition.y, _pEngine.particleSize, 0, 2 * Math.PI);
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
            
            if (dist >= _pEngine.spread) {
                _pEngine.particles.splice(_pEngine.particles.indexOf(particle), 1);
            }
            
            particle.lastPosition = currentPosition;
        })
    }

    return window.pEngine = new ParticleEngine();

}(window));

export default ParticleSystem;