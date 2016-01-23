'use strict';

const gpio = require('rpi-gpio');

// This is the constructor for TrafficLights objects
// It takes a pinNumber and the desired time (in ms) for it to be lit
function TrafficLight(pinNumber, delay) {
    this.pinNumber = pinNumber;
    this.delay = delay;
}

// The pins we want to manipulate
let greenLight = new TrafficLight(3, 3000);
let yellowLight = new TrafficLight(5, 1000);
let redLight = new TrafficLight(7, 3000);

// This is the array in which we will iterate
let lightOrder = [greenLight, yellowLight, redLight];

// This sets up the provided pin number
function setupPin(pin) {
    // Here we return a promise
    // This promise gets resolved when everything is done without errors
    return new Promise((resolve, reject) => {
        gpio.setup(pin, gpio.DIR_OUT, (err) => {
            if (err === undefined) {
                // If there were no errors we resolve it
                resolve();
            } else {
                // Otherwise we reject it
                reject(err);
            }
        });
    });
}

// This function lights the pin on the provided position and turns off the others
function lightPosition(pos) {
    // Here we iterate through every pin inside the lightOrder array
    for (let i = 0; i < lightOrder.length; i++) {
        // If the current position is the one we want to light, we turn it on
        // Otherwise we turn it off
        gpio.write(lightOrder[i].pinNumber, i === pos ? true : false);
    }
}

// This is the main loop
function mainLoop() {

    // This is like a cursor, it holds the position on the lightOrder array we're currently at
    let currentPosition = 0;

    function lightNext() {
        // First we light the pin on the current position and turn the others off
        lightPosition(currentPosition);

        // This logs the number of the pin we've just turned on to the console (feel free to comment the next line)
        console.log(`Current Pin: ${lightOrder[currentPosition].pinNumber}`);

        // Now we schedule the next light to be lit just after the current light's delay (in ms)
        setTimeout(lightNext, lightOrder[currentPosition].delay);

        // Now we add one to the current position, going to the next position (obviously)
        currentPosition++;

        // If we've reached the end of the positions array (`lightOrder`) we go back to its beginning
        if (currentPosition === lightOrder.length) {
            currentPosition = 0;
        }

    }

    // We need to call our lightNext function for the first time when starting the mainLoop
    lightNext();
}

// Here we create a promise for each one of the pins and add it to our promise array
let pinPromises = [];
for (let i = 0; i < lightOrder.length; i++) {
    pinPromises.push(setupPin(lightOrder[i].pinNumber));
}

// After every promise gets resolved we call the function that runs our main loop
Promise.all(pinPromises).then(() => {
    mainLoop();
}).catch((err) => {
    // If one of the promises got rejected we go here
    // This means there was an error, so we log it to the console
    console.log(err);
});
