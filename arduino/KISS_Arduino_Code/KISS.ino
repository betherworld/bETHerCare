#include <SoftwareSerial.h>

//Define Button Pins
const int button_r = 9;
const int button_y = 10;
const int button_g= 11;

//Define LED Pins
const int led_y = 13;
const int led_g = 6;

//Define Sensor Pin
const int hall = 8;

// Define global Variables
int i = 0;
unsigned long StartTime;
unsigned long CurrentTime;
unsigned long ElapsedTime;
unsigned long Time;
String data;
String Satisfaction="waiting";


void setup() {

  //Open Serial Port
  Serial.begin(9600);

  //Define pinModes
  pinMode(button_g, INPUT_PULLUP);
  pinMode(button_y, INPUT_PULLUP);
  pinMode(button_r, INPUT_PULLUP);
  pinMode(led_y,OUTPUT);
  pinMode(led_g, OUTPUT);
  pinMode(hall, INPUT);
  
  //Set LED low per default
  digitalWrite(led_y,LOW);
  digitalWrite(led_g,LOW);

}

void loop() {
  
  bool check1 = false;
  bool check2 = false;

  //Read Input from Sensor
  int magnet = digitalRead(hall);

  //Check if login or logout
  if (magnet==0){i=i+1;delay(750);}

  if ((i%2)== 1) check1= true;
  else if((i%2)== 0) check1= false;

  //Start Timer. Set indicator LED high
  if(check1==true){
    digitalWrite(led_g,HIGH);
    StartTime = 0;
    StartTime = millis();
    ElapsedTime = (StartTime - CurrentTime)/1000;

  //Read Buttons for Satisfaction status
  int green = digitalRead(button_g);
  int yellow = digitalRead(button_y);
  int red = digitalRead(button_r);
    
    if (red == false)
  Satisfaction = "Not Good";

  else if (yellow == false)
  Satisfaction = "Neutral";

  else if (green == false)
  Satisfaction = "Good";
    
    
    data = ElapsedTime + String("Q") + String(Satisfaction);
    Serial.println(data);
        
  }

  
  else if(check1==false) {digitalWrite(led_g,LOW);
  CurrentTime = millis();

  //Read Buttons for Satisfaction status
  int green = digitalRead(button_g);
  int yellow = digitalRead(button_y);
  int red = digitalRead(button_r);
    
    if (red == false)
  Satisfaction = "Not Good";

  else if (yellow == false)
  Satisfaction = "Neutral";

  else if (green == false)
  Satisfaction = "Good";
  
  
  }

  
  
  }

  

  
  


