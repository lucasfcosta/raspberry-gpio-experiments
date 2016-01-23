'use strict';

const express = require('express');
const gpio = require('rpi-gpio');

// Setting up server
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Setting up pins
let greenLight = new TrafficLight('green', 3, 3000);
let yellowLight = new TrafficLight('yellow', 5, 1000);
let redLight = new TrafficLight('red', 7, 3000);
let trafficLights = [greenLight, yellowLight, redLight];

app.set('port', process.env.PORT || 3000);

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

console.log('Setting up pins...');

// Here we create a promise for each one of the pins and add it to our promise array
let pinPromises = [];
for (let i = 0; i < trafficLights.length; i++) {
    pinPromises.push(setupPin(trafficLights[i].pinNumber));
}

// After every promise gets resolved we call the function that runs our main loop
Promise.all(pinPromises).then(() => {
    console.log('Pins ready.');
    server.listen(app.get('port'), () => {
        console.log(`Server Running on http://localhost: ${app.get('port')}`);
    });
}).catch((err) => {
    // If one of the promises got rejected we go here
    // This means there was an error, so we log it to the console
    console.log(err);
});

io.on('connection', function (socket) {
    socket.on('changeColor', (color) => {
        console.log(`Changing color to ${color}.`);
        changeColor(color);
    });
});

// This is the constructor for TrafficLights objects
// It takes a pinNumber and the desired time (in ms) for it to be lit
function TrafficLight(color, pinNumber, delay) {
    this.color = color;
    this.pinNumber = pinNumber;
    this.delay = delay;
}

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

function changeColor(color) {
    for (let i = 0; i < trafficLights.length; i++) {
        // If the current color is the one we want to light, we turn it on
        // Otherwise we turn it off
        gpio.write(trafficLights[i].pinNumber, color === trafficLights[i].color ? true : false);
    }
}

// This is the main loop for automatic mode
function toggleAuto() {

    console.log('Automatic mode is ON.');

    // This is like a cursor, it holds the position on the trafficLights array we're currently at
    let currentPosition = 0;

    function lightNext() {
        // First we light the pin on the current position and turn the others off
        lightColor(trafficLights[currentPosition].color);

        // Now we schedule the next light to be lit just after the current light's delay (in ms)
        setTimeout(lightNext, trafficLights[currentPosition].delay);

        // Now we add one to the current position, going to the next position (obviously)
        currentPosition++;

        // If we've reached the end of the positions array (`trafficLights`) we go back to its beginning
        if (currentPosition === trafficLights.length) {
            currentPosition = 0;
        }
    }

    // We need to call our lightNext function for the first time when starting the mainLoop
    lightNext();
}
