import ParticleSystem from "./lib/ParticleSystem.js";

const context = document.querySelector("#canvas").getContext("2d");
const controlSize = document.querySelector("#controlSize");
const controlShape = document.querySelector("#controlShape");
const controlMax = document.querySelector("#controlMax");
const controlSpeed = document.querySelector("#controlSpeed");
const controlSpread = document.querySelector("#controlSpread");
const controlMode = document.querySelector("#controlMode");
const controlInterval = document.querySelector("#controlInterval");
const controlForceOn = document.querySelector("#controlForceOn");
const controlMagnitude = document.querySelector("#controlMagnitude");
const helpContainer = document.querySelector("#helpContainer");

const mouseState = {
    x: 0,
    y: 0,
    active: false
}

function updateMousePos(e) {
    mouseState.x = e.offsetX;
    mouseState.y = e.offsetY;
}

canvas.addEventListener("mousemove", updateMousePos);
canvas.addEventListener("mouseenter", () => mouseState.active = true);
canvas.addEventListener("mouseleave", () => mouseState.active = false);

function update() {

    if (controlMode.value === "radial") {
        controlInterval.parentNode.classList.remove("hidden");
    }
    else {
        controlInterval.parentNode.classList.add("hidden");
    }
    if (parseInt(controlForceOn.value) === 2) {

        controlMagnitude.parentNode.classList.remove("hidden");
        helpContainer.classList.remove("hidden");

        if (mouseState.active) {
            pEngine.applyForce(mouseState.x, mouseState.y, controlMagnitude.value);
        }
    }
    else {
        controlMagnitude.parentNode.classList.add("hidden");
        helpContainer.classList.add("hidden");

    }

    pEngine.setup(context, {
        mode: controlMode.value,
        particleShape: controlShape.value,
        max: parseInt(controlMax.value),
        interval: parseInt(controlInterval.value),
        particleSize: parseInt(controlSize.value),
        speed: parseInt(controlSpeed.value),
        spread: parseInt(controlSpread.value),
    });

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);


    pEngine.draw(context.canvas.width / 2, context.canvas.height / 2);
    pEngine.update();

    requestAnimationFrame(update);
}

update();
