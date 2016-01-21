'use strict';

const gpio = require('rpi-gpio');

// The pins we want to manipulate
let greenPin = 3
let yellowPin = 5
let redPin = 7;

let pinOrder = [greenPin, yellowPin, redPin];

// The delay between each time it lights up (in millisseconds)
let blinkDelay = 1000;

function gpioSetup() {
	gpio.setup(greenPin, gpio.DIR_OUT, () => {
		gpio.setup(yellowPin, gpio.DIR_OUT, () => {
			gpio.setup(redPin, gpio.DIR_OUT, start);
		});
	});
}

// This is the function that turns the voltage on pin 7 on and off
// It uses the value specified on `blinkDelay` as delay
function start() {
	
	let currentPosition = 0;

	setInterval(() => {
		lightPosition(currentPosition);

		currentPosition++;

		if (currentPosition === pinOrder.length - 1) {
			currentPosition = 0;
		}

	}, blinkDelay);
}

function lightPosition(pos) {
	for (let i = 0; i < pinOrder.length; i++) {
		gpio.write(pinOrder[i], i === pos ? true : false);
	}
}

gpioSetup();