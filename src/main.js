import ParticleSystem from "./lib/ParticleSystem.js";

const context = document.querySelector("#canvas").getContext("2d");
const controlMax = document.querySelector("#controlMax");
const controlSpeed = document.querySelector("#controlSpeed");
const controlSpread = document.querySelector("#controlSpread");
const controlMode = document.querySelector("#controlMode");
const controlInterval = document.querySelector("#controlInterval");

console.log(controlSpeed.value);

function update() {

    if (controlMode.value === "radial") {
        controlInterval.parentNode.classList.remove("hidden");
    }
    else {
        controlInterval.parentNode.classList.add("hidden");
    }

    pEngine.setup(context, {
        mode: controlMode.value,
        max: parseInt(controlMax.value),
        interval: parseInt(controlInterval.value),
        speed: parseInt(controlSpeed.value),
        spread: parseInt(controlSpread.value)
    });

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    pEngine.draw(context.canvas.width / 2, context.canvas.height / 2);
    pEngine.update();

    requestAnimationFrame(update);
}

update();
