# Plant Manager

View online app here: http://plantager.azurewebsites.net

---

[Version]    9/11/17:  Plant Manager v1.0.0

[Used]       Arduino/C, JavaScript, HTML + p5.js and p5.serial libraries from Processing


[Resources] 

GitHub: https://github.com/vaneslin/PlantManager 

Azure: http://plantager.azurewebsites.net 

Demo: https://youtu.be/dfNE7GkEbVA 
 
 
[Description] 
The idea for a Plant Manager arose when I visited a family friend in late October. Her house was filled with beautiful (dead) plants in varying states of decay. After confiding in me that she never knew when or how much to water her plants, I promised her a solution. 

Plant Manager is an Azure web app that monitors the state of your plant’s moisture level and ambient temperature, using an Arduino UNO, a moisture sensor, and a thermistor. 

Features:  

•	Displays current temperature and soil moisture level 

•	Plots soil moisture level over a period of 24 hours, refreshing each day 

•	Based on temperature and moisture level, displays watering suggestion and comments on temperature 


[Materials] 

Hardware:

1 Arduino UNO + USB connector 

1 Kuman Moisture Sensor 

1 Thermistor 

1 10k ohm resistor 

1 Breadboard 

Wires as needed 


Software:

Arduino IDE  

Node.js 


[Circuit Diagram]
http://bit.ly/2zysNTA


[Setup]
1.	Connect hardware as shown in the circuit diagram (link above) and connect Arduino Uno to computer via USB connector
2.	Clone PlantManager onto your computer or download as a .zip file
3.	Open Arduino_Code.ino with Arduino IDE
4.	Select the right port in Tools > Port (mine is "/dev/cu.usbmodem143221")
5.	Upload sketch
6.	In the console, navigate to the PlantManager project directory
7.	Type in following console command to start serial server:  node startserver.js
8.	View live data in Plant Manager:  http://plantager.azurewebsites.net

[OpenSCAD]
Protect your Arduino from the elements and any watering accidents! This case (case.scad) was rendered and modeled with OpenSCAD.

Case Image: http://bit.ly/2mcfN38

Features:

•	Snug, dark coloured case with openings for wiring and USB connector

•	Top lid engraved with text

•	Bottom of case supported by four feet






