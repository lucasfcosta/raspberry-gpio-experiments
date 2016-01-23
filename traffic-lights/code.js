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

function gpioSetup() {

	// Here we're setting up each one of the pins
	gpio.setup(greenPin, gpio.DIR_OUT, () => {
		gpio.setup(yellowPin, gpio.DIR_OUT, () => {
			gpio.setup(redPin, gpio.DIR_OUT, start);
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
function start() {
	
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

gpioSetup();