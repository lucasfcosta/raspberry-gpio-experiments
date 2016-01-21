# Single Led

This experiment will show you how to light a LED for the very first time in your life.

## Needed Materials

- 1 Breadboard
- 1 Led (5mm) - Mine operates at 1,9V-2,1V and 20mA
- 1 Resistor 150Ω (anything above this will work, but 150Ω is ideal)
- 2 Male/Female Jumpers

## What is Happening

We already know our LED needs about 2V and 20mA to operate, so, first of all, we will calculate how much resistence we need in order to make our LED very bright without burning it.

Let's use OHM's law, which states that ["the current through a conductor between two points is directly proportional to the voltage across the two points"](https://en.wikipedia.org/wiki/Ohm's_law). Resistance is the constant of proportionality to measure this relation.

This means: `Resistance = Voltage * Current` or `R = I * V`.

So, to measure how much resistance we need in order to supply 2v and 20mA to our LED we will follow the following steps:

1. The tension (measured in volts) is always relative to 2 points, so the tension between our power supply and the LED needs to be `3v`, because `5v (Supply) - 2v (LED) = 3v`
2. Calculate the needed resistance for a current of 20mA (0.02A) to pass when there's a tension of 3v:
..1. `R = V / I`
..2. `R = 3 / 0.02` (`I` is always measured in A and not mA)
..3. `R = 150` -> This means 150Ω is the ideal resistor for this case

If you don't have a 150Ω resistor available, anything higher will work, but your led may not be as bright as it would be with a 150Ω resistor.

**WARNING:** Make sure to check your LED specs before trying this. The operation Voltage and Current of it may be different from mine. These values are also called `Forward Voltage` and `Forward Current`, respectively.

## Circuit Diagram

Please consider the power supply as a RaspberryPi.
* `+` is the 5v pin (1st pin)
* `-` is the GND pin (6th pin)

Take a look at [this image if](../rp2-pins.png?raw=true) you need help locating those pins.

![Circuit Diagram](./diagram.png?raw=true)

## Simulation

This is an accurate image illustrating the circuit using a real Raspberry Pi 2 Model B.

![Fritzing Simulation](./fritzing-simulation.png?raw=true)

## Draft

Please consider the power supply as a RaspberryPi.
* `+` is the 5v pin (1st pin)
* `-` is the GND pin (6th pin)

Take a look at [this image if](../rp2-pins.png?raw=true) you need help locating those pins.

![Draft](./simulation.png?raw=true)

## Cool Picture

![Cool Picture](./cool-picture.jpg?raw=true)
