import { Vector2D } from "./MathFunctions.js";
import Mode from "./Mode.js" 

const defaultOptions = {
    max: 450,
    speed: 40,
    spread: 300,
    interval: 5,
    particleSize: 5,
    particleShape: "ellipse",
    mode: "random",
}

const ParticleSystem = (function(window) {

    /**
     * Constructor for the base particle system.
     * 
     * @param {Object} options - User defined options to change the behaviour of the particles 
     */

    function ParticleEngine(options = defaultOptions) {
        this.max = options.max;
        this.mode = options.mode;
        this.speed = options.speed;
        this.spread = options.spread;
        this.interval = options.interval;
        this.particleSize = options.particleSize;
        this.particleShape = options.particleShape;
        this.context;
        this.particles = [];
    };

    /**
     * Setup method for the base particle system.
     * 
     * @param {Object} context
     * @param {Object} options
     */

    ParticleEngine.prototype.setup = function(context, options = {}) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;
        
        Object.assign(_pEngine, options);
        
        _pEngine.context = context;
        
        return _pEngine;
    }

    /**
     * Adds new particles to the particle array and draws to the screen.
     * 
     * @param {number} x
     * @param {number} y
     */

    ParticleEngine.prototype.draw = function(x, y) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;
        const ctx = _pEngine.context;
        const p = new Particle(x, y, _pEngine.particleSize);

        switch (_pEngine.mode) {
            case "random":
                p.velocity = Mode.randomFire();
                break;
            case "radial":
                p.velocity = Mode.radialFire(_pEngine.interval);
                break;
        }

        if (_pEngine.particles.length < _pEngine.max) {
            _pEngine.particles.push(p);
        }

        _pEngine.particles.forEach(particle => {
            ctx.save();
            
            switch (_pEngine.particleShape) {
                case "ellipse":
                    ctx.beginPath();
                    ctx.arc(particle.lastPosition.x, particle.lastPosition.y, particle.size, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
                case "square":
                    ctx.beginPath();
                    ctx.fillRect(particle.lastPosition.x, particle.lastPosition.y, particle.size, particle.size);
                    ctx.fill();
                    break;
            }

            ctx.restore();
        });
    }

    /**
     * Updates each particles position on the screen and removes them once they're reached their limit.
     * 
     * @param {number} deltaTime - 1/60 by default. 
     */

    ParticleEngine.prototype.update = function(deltaTime = 1/60) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;

        _pEngine.particles.forEach(particle => {
            const currentPosition = new Vector2D(particle.lastPosition.x, particle.lastPosition.y);
            const velocity = new Vector2D(particle.velocity.x * _pEngine.speed * deltaTime, particle.velocity.y * _pEngine.speed * deltaTime);
            const dist = Vector2D.distance(particle.startPosition, currentPosition);

            currentPosition.add(velocity);
            
            if (dist >= _pEngine.spread) {
                _pEngine.particles.splice(_pEngine.particles.indexOf(particle), 1);
            }
            
            particle.lastPosition = currentPosition;
        })
    }

    ParticleEngine.prototype.applyForce = function(x, y, magnitude) {
        const _pEngine = this instanceof ParticleEngine ? this : pEngine;

        _pEngine.particles.forEach(particle => {
            const dist = Vector2D.distance(new Vector2D(x, y), particle.lastPosition);
            const angle = Vector2D.getAngle(new Vector2D(x, y), particle.lastPosition);

            const force = Vector2D.fromAngle(angle);

            particle.velocity.add(force.divide(dist / magnitude));
        });
    }

    /**
     * Constructor for each individual particle.
     * 
     * @param {number} x - The x position of the centre point of the particles.
     * @param {number} y - The y position of the centre point of the particles.
     * @param {number} size - The size in pixels of the particles.
     */

    function Particle(x, y, size) {
        this.startPosition = new Vector2D(x, y);
        this.lastPosition = this.startPosition;
        this.size = size;
        this.velocity;
        this.spawnTime = Date.now();
    };

    return window.pEngine = new ParticleEngine();

}(window));

export default ParticleSystem;