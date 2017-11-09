#include<math.h>
#define THERMISTOR A0  //thermistor @ A0
#define MOISTURE A1  //moisture sensor @ A1 
   
double getTemperature(int thermistorReading) {
 /*** returns calculated Celcius temperature ***/ 
 //Steinhard-Hart equation from source: https://www.ametherm.com/thermistor/ntc-thermistors-steinhart-and-hart-equation
 double temp = log(10000.0 * (( 1023.0 / thermistorReading - 1))); 
 temp = 1 / (0.001129148 + (0.000234125 + (0.0000000876741 * temp * temp )) * temp );
 
 //subtract 273.15 to convert from Kelvin to Celcius
 temp = temp - 273.15;        
 
 //calibrated with cold and hot temperatures, constant gap of ~ 6 degrees
 temp += 6;
 return temp;
}

double getMoisture(int moistureReading) {
  /*** returns moisture %, where moistureReading ranges from 0 (underwater) to 1023 (bone dry) ***/
  double moisture = 100.0 - (100.0 * (moistureReading / 1023.0));
  return moisture;
}
 
void setup(void) {
  Serial.begin(9600);
}
 
void loop(void) {
  Serial.println(int(getMoisture(analogRead(MOISTURE)))); 
  Serial.println(int(getTemperature(analogRead(THERMISTOR))));
  delay(2000);
}
