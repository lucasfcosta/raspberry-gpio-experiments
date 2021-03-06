# Blinking a Single LED

This experiment will show you how to make a LED blink. Consider this as the hardware hackers' "Hello World!".

## Needed Materials

- 1 Breadboard
- 1 LED (5mm) - Mine operates at 1,9V-2,1V and 20mA
- 1 150Ω Resistor (anything slightly above this will work, but 150Ω is ideal)
- 2 Male/Female Jumpers
- 1 Male/Male Jumper (for organization purposes) - This is not mandatory

## Instructions

### Electronics

As we did on [the last experiment](../single-led/README.md), we will calculate how much resistance we need for our LED. For this experiment we're going to use the same led we did [last time](../single-led/README.md), therefore we know we've gotta use a 150Ω resistor.

If you don't have a 150Ω resistor available, anything higher will work, but your led may not be as bright as it would be with a 150Ω resistor.

This time, **instead of supplying power through pin 1, we will use pin 7**. We will do this because it's a "programmable pin", thus we will be able to turn it on and off. Then, before supplying power to the LED we need to use our 150Ω resistor and make sure the LED's longer leg is on the plus side. After this all we've gotta do is take the current back to RaspberryPi's GND pin (pin number 6).

### Code

For this experiment we will need [Node.js (check this link if you don't know how to install it on your RaspberryPi)](http://blog.wia.io/installing-node-js-v4-0-0-on-a-raspberry-pi/) and [some code](./code.js).

I highly recommend you to clone this repository on your Pi using:

```
$ git clone https://github.com/lucasfcosta/raspberry-gpio-experiments
```

Now go to the `blink-single-led` folder and run `npm install` to install the dependencies for this project. In this case we will only need a module called [`rpi-gpio`](https://www.npmjs.com/package/rpi-gpio) in order to control our GPIO pins.

Okay, we've got everything ready to run! Go to your terminal and run our [`code.js` file](./code.js) using:

```
$ sudo node code.js
```

If you've done everything right your led may start blinking right now.

[**If you need an explanation on what the code does, its own file has lots of useful and detailed comments, take a look at it. I'm sure you will understand everything you need to.**](./code.js)

**WARNING:** Make sure to check your LED specs before trying this. The operation Voltage and Current of it may be different from mine. These values are also called `Forward Voltage` and `Forward Current`, respectively.


## Circuit Diagram

Take a look at [this image](../rp2-pins.png?raw=true) if you need help locating those pins.

![Circuit Diagram](./diagram.png?raw=true)


## Simulation

This is an accurate image illustrating the circuit using a real Raspberry Pi 2 Model B.

![Fritzing Simulation](./fritzing-simulation.png?raw=true)

Notice that I've used a Male/Male jumper here to get the current to the `-` rail before going into the RaspberryPi. This isn't needed at all. You could use a single Male/Female jumper straight from the breadboard to your RaspberryPi's GND pin, but for organization purposes I've done this.


## Cool Picture

![Cool Picture](./cool-picture.gif?raw=true)
