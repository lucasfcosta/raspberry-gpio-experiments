'use strict';

const gpio = require('rpi-gpio');

// The pins we want to manipulate
let greenPin = 3
let yellowPin = 5
let redPin = 7;

// This is the array which will be iterated
let pinOrder = [greenPin, yellowPin, redPin];

// The delay between lighting each one of the LEDS (in millisseconds)
let blinkDelay = 1000;

// This sets up the provided pin number
function setupPin(pin) {
	// Here we return a promise
	// This promise gets resolved when everything is done without errors
	return new Promise((resolve, reject) => {
		gpio.setup(pin, gpio.DIR_OUT, (err) => {
			if (err !== undefined) {
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
	// Here we iterate through every pin inside the pinOrder array
	for (let i = 0; i < pinOrder.length; i++) {
		// If the current position is the one we want to light, we turn it on
		// Otherwise we turn it off
		gpio.write(pinOrder[i], i === pos ? true : false);
	}
}

// This is the main loop
function mainLoop() {
	
	// This is like a cursor, it holds the position on the pinOrder array we're currently at
	let currentPosition = 0;

	// This runs every <blinkDelay>ms 
	setInterval(() => {
		// First we light the pin on the current position and turn the others off
		lightPosition(currentPosition);

		// This logs the number of the pin we've just turned on to the console (feel free to comment the next line)
		console.log(`Current Pin: ${pinOrder[currentPosition]}`);

		// Now we add one to the current position, going to the next position (obviously)
		currentPosition++;

		// If we've reached the end of the positions array (`pinOrder`) we go back to its beginning
		if (currentPosition === pinOrder.length) {
			currentPosition = 0;
		}
	}, blinkDelay);
}

// Here we create a promise for each one of the pins and add it to our promise array
let pinPromises = [];
for (let i = 0; i < pinOrder.length; i++) {
	pinPromises.push(setupPin(pinOrder[i]));
}

// After every promise gets resolved we call the function that runs our main loop
Promise.all(pinPromises).then(() => {
	mainLoop();
}).catch((err) => {
	// If one of the promises got rejected we go here
	// This means there was an error, so we log it to the console
	console.log(err);
});
