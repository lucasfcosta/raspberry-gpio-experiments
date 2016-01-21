const gpio = require('rpi-gpio');

// The pin we want to manipulate
let pin = 7;

// The delay between each time it lights up (in millisseconds)
let blinkDelay = 500;

// Here we're setting up a channel to write to pin 7
// gpio.DIR_OUT is a constant that indicates we want to write content
// The last argument is the function it will call after setting everything up
gpio.setup(pin, gpio.DIR_OUT, blink);

// This is the function that turns the voltage on pin 7 on and off
// It uses the value specified on `blinkDelay` as delay
function blink() {
	// This indicates if the pin is on or off
	let currentStatus = false;

	setInterval(() => {
		// Here we write the opposing value of the current status
		gpi.write(pin, !currentStatus)

		// Now we update the current status
		currentStatus = !currentStatus;
	}, blinkDelay);
}
