import processing.serial.*;
Serial myPort;
String Status = "TimeQ";
String Time = null;
String Satisfaction = null;
String Name = "Xhevat Müller";
int place=0;
int j =0;
boolean k = true;

void setup(){
  size(500, 300);
  myPort = new Serial(this, "COM6", 9600);
  myPort.bufferUntil('\n');
}
void serialEvent (Serial myPort){ // Checks for available data in the Serial Port
  Status = myPort.readStringUntil('\n'); //Reads the data sent from the Arduino (the String "LED: OFF/ON) and it puts into the "ledStatus" variable
}

void draw(){
  
  
  //GUI
  background(237, 240, 241);
  textSize(24);
  fill(33);
  text("Time passed:", 75, 150);
  text("Satisfaction:", 75, 200);
  text("KISSer:", 75, 75);
  
  //Alogrithm to extract the strings from the serial input
  while (k){
  
  if (Status.charAt(j) == 'Q'){k=false;}
  else place = place + 1;j++;
 }
  
  int slength = Status.length();
  
  Time = (Status.substring(0,place));
  Satisfaction = (Status.substring(place+1,slength));
  
  j=0;
  
  text(Name, 300, 75);
  text(Time, 300, 150); // Prints the string comming from the Arduino
  text(Satisfaction, 300, 200);
  
  k = true;
  j=0;
  place=0;
  
}
