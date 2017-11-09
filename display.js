//serial values
var serial;
var port = "/dev/cu.usbmodem145221";
var isMoistureData = true;
var temperature = 0;  //arduino integer output of temperature
var moisture = 0;  //arduino integer output of moisture
var dataArray = new Array();  //dataArray = {time_1, moisture%_1, time_2, moisture%_2, ..., time_n, moisture%_n}

//graph variables
var height = 860;
var width = 1440;
var numTicks = 24;  //number of tick marks on x axis, 24 hours in 1 day
var tickLength = 900/numTicks;
var yAxisXPos = 480;  //x coordinate of the y axis line
var xAxisYPos = height - 125;  //y coordinate of the x axis line
var xData, yData;  //coordinates of time (x) and moisture level (y) on graph

//images
var plant, header;

function preload() {
  /*** load images before setup() ***/
  plant = loadImage("lavender.png");  //source: http://everything-lavender.com/growing-lavender-in-containers.html
  header = loadImage("garden.png");  //source: http://blog.1800gotjunk.com/wp-content/uploads/2014/11/Indoor-Gardening-Fresh.jpg
}

function setup() {
  /*** runs once then loops draw() ***/
  createCanvas(1440, 861);
  today = day();
  //thisminute = minute();
  //setup serial reading
  serial = new p5.SerialPort();
  serial.on("data", serialEvent);
  serial.on("error", serialError);
  serial.open(port, 9600);
  serial.clear();
}

function serialEvent() {
  /*** runs each time serial data is recieved ***/
  var arduinoData = serial.readLine();
  if (arduinoData.length > 0){
    if(isMoistureData){  //arduino alternates moisture and temp data, use isMoistureData to determine which is which
      moisture = Number(arduinoData);
      isMoistureData = false;

      //map data onto graph coordinates
      xData = yAxisXPos + hour()*tickLength + (minute()/60)*tickLength;
      yData = xAxisYPos - (moisture/100)*360;

      //if data goes past 24:00, start a new day
      if (day()!= today){
        dataArray = new Array();
        today = day();
      }

      //Demo purposes ************************
      //xData = yAxisXPos + (second()/60)*900;
      // if (minute()!=thisminute){
      //   dataArray = new Array();
      //   thisminute = minute();
      // }

      //adds point (time, moisture%) to dataArray
      append(dataArray, xData);
      append(dataArray, yData);

    } else {
      temperature = Number(arduinoData);
      isMoistureData = true;
    }
  }
}

function serialError(err) {
  /*** if serial reading raises error ***/
  println("Error Alert! " + err);
}

function draw() {
  /*** runs and refreshes continuously ***/
  background(255);
  stroke(0);
  rect(0, 0, width - 1, height - 1);  //thin border around entire app for browser sizes > 1440 x 860

  //setup components
  drawTitleBar();
  drawPlantDashboard();
  drawGraph();  //note: must plot data points directly inside draw() and not in drawGraph() due to how draw() is implemented

  //plot data points (time, moisture %)
  for(var dataPoint = 0; dataPoint < dataArray.length - 1; dataPoint += 2){
    if(dataPoint == dataArray.length - 2){  //if most current point, make point larger and blue
      fill(134, 134, 134);
      ellipse(dataArray[dataPoint], dataArray[dataPoint + 1], 6, 6);
      fill(0, 102, 102);
      textSize(12);
      noStroke();
      text("(" + getTime() + ", " + moisture + "%)", dataArray[dataPoint] + 5, dataArray[dataPoint + 1] - 15);
    } else {
      fill(0, 153, 153);
      ellipse(dataArray[dataPoint], dataArray[dataPoint + 1], 2, 2);
    }
    stroke(135, 240, 240);
    //connect the data points
    if(dataPoint + 2 < dataArray.length - 1){
      line(dataArray[dataPoint], dataArray[dataPoint + 1], dataArray[dataPoint + 2], dataArray[dataPoint + 3]);
    }
  }

  //display images after loading in preload()
  image(plant, 10, 690, 120, 150);
  image(header, 0, 0, 1440, 200);
}

function drawTitleBar() {
  /*** black header bar with white title ***/
  fill(0);
  rect(0, 200, width, 100);
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("Arduino Plant Manager", width/2, 265);
}


function drawPlantDashboard() {
  /*** draws dashboard area on left containing sensor readings, thermometer, and watering suggestions ***/
  fill(255);
  stroke(0, 102, 102);
  rect(0, 300, 400, 560);  //border for entire plant dashboard section
  rect(0, 300, 200, 350);  //border for thermometer section
  rect(200, 475, 200, 175);  //border for temperature reading section

  //display moisture % and temperature data
  textSize(60);
  fill(0, 153, 153);
  text(moisture + "%", 300, 390);
  text(temperature + '\u00B0C', 300, 570);

  //display captions
  textSize(18);
  fill(0, 102, 102);
  text("SOIL MOISTURE", 300, 440);
  text("TEMPERATURE", 300, 615);

  //draws a dynamic thermometer that takes the y position of the thermometer base as argument
  displayThermometer(580);

  //display watering suggestion
  textSize(18);
  fill(0, 102, 102);
  text("Your Plant:", 250, 720);
  var wateringSuggestion;
  if(moisture > 60){
    wateringSuggestion = "Whoa there! \nIs that an aquatic plant \n or are you trying to drown it?";
  } else if (moisture > 40){
    wateringSuggestion = "Your plant is feeling snug, \nnourished, and happy.\nYou great owner, you!";
  } else if (moisture > 30){
    wateringSuggestion = "Perhaps wait an hour or two \nbefore watering me!";
  } else if (moisture > 10){
    wateringSuggestion = "Time for that daily watering!\n Shower me with your love.";
  } else {
    wateringSuggestion = "(wheeze) Water...w-wa...ter...\nplease... (chokes)";
  }
  fill(0, 153, 153);
  text(wateringSuggestion, 250, 760);
}


function drawGraph() {
  /*** draws X and Y axis using x coordinate of Y Axis position and y coordinate of X Axis position as reference ***/
  line(yAxisXPos, 375, yAxisXPos, xAxisYPos);  //y axis
  line(yAxisXPos, xAxisYPos, width - 60, xAxisYPos);  //x axis

  //draws increment (tick) marks
  fill(0, 153, 153);
  textSize(18);
  for (var yTick = 0; yTick <= 10; yTick++){
    line(yAxisXPos - 10, (xAxisYPos) - yTick*36, yAxisXPos, (xAxisYPos) - yTick*36);  // y axis tick marks
    text(yTick*10, yAxisXPos - 30, (xAxisYPos) - yTick*36 + 6);  //labels (0 - 100 in increments of 10)
  }
  for (var xTick = 0; xTick <= numTicks; xTick++){
    line(yAxisXPos + xTick*tickLength, xAxisYPos,  yAxisXPos + xTick*tickLength, xAxisYPos + 5);  //x axis tick marks
    if (xTick%2 == 0){
      text(xTick + ":00", yAxisXPos + xTick*tickLength, xAxisYPos + 30);  //labels (0:00 - 24:00 in increments of 2)
    }
  }

  //label axes: x = current time, y = moisture %
  textSize(14);
  fill(0, 102, 102);
  text("Moisture %", yAxisXPos - 20 , 375 - 20);
  textSize(24);
  text("Currently " + getTime() + ",  " + day() + "/" + month() + "/" + year(), yAxisXPos + 0.5*numTicks*tickLength, xAxisYPos + 80);
}


function displayThermometer(thermometerYPos){
  /*** based on the Y position of thermometer base, displays thermometer and red temperature bar ***/
  fill(180, 0, 0);
  noStroke();
  rect(95, thermometerYPos - 2.5*temperature, 10, 2.5*temperature);  //dynamic red temperature bar
  ellipse(100, thermometerYPos + 10, 20, 20);  //red circle on thermometer

  //thermometer outline
  stroke(0);
  noFill();
  line(90, thermometerYPos - 255, 110, thermometerYPos - 255);  //3 lines that make outside outline of thermometer
  line(90, thermometerYPos - 255, 90, thermometerYPos - 2);
  line(110, thermometerYPos - 255, 110, thermometerYPos - 2);
  ellipse(100, thermometerYPos + 10, 30, 30);  //round outline on thermometer base
  fill(0, 102, 102);

  //thermometer tick marks
  for(var thermometerTicks = 0; thermometerTicks <= 100; thermometerTicks+=2){
    line(94, thermometerYPos - 2.5*thermometerTicks, 105, thermometerYPos - 2.5*thermometerTicks);
  }

  //display temperature suggestion under thermometer
  var thermometerCaption;
  var captionSpace = 0;  //variable adjusting spacing of caption from thermometer depending on length
  if(temperature > 40){
    fill(210, 5 , 5);
    thermometerCaption = "BOILING";
    captionSpace = 10;
  } else if (temperature > 30){
    fill(250, 160, 0);
    thermometerCaption = "HOT";
  } else if (temperature > 20){
    fill(0, 180, 0);
    thermometerCaption = "IDEAL";
    captionSpace = 3;
  } else if (temperature > 10){
    fill(0, 204, 204);
    thermometerCaption = "CHILLY";
    captionSpace = 10;
  } else {
    fill(102, 102, 102);
    thermometerCaption = "FREEZING";
    captionSpace = 20;
  }
  noStroke();
  text(temperature + '\u00B0C', 140, thermometerYPos - 2.5*temperature)
  textSize(14);
  text("(" + thermometerCaption + ")", 140 + captionSpace, thermometerYPos - 2.5*temperature + 20);
  stroke(0);
}


function getTime() {
  /*** returns a string representing 24hr time ***/
  var minutes;
  if (minute() < 10){
    //if minute is in single digits, prepend a 0
    minutes = "0" + minute();
  } else {
    minutes = minute();
  }
  var currentTime = hour() + ":" + minutes;
  return currentTime;
}
