




var w= 3;  //variable for width of each band in frequency analysis
var soundFile; //soundFile to load in
var delay; 
var reverb;
var chkRVB; //function for checking reverb box
var fft
var checkboxRVB

function preload() {
  soundFormats('ogg', 'wav'); 
  soundFile = loadSound('clap.wav'); //load sound file from library
}

function setup() {
  createCanvas(710, 400);

  checkboxRVB = createCheckbox('Reverb', false); //checkboxes for reverb
  checkboxRVB.changed(chkRVB);
    
  delay = new p5.Delay();   //new deplau
  delay.process(soundFile, .12, .7, 2300); //process the sound file 
  delay.setType('pingPong'); // a stereo effect
  
  fft = new p5.FFT(); 
 
}


function draw() {
  background(0);
    
    
    
      var spectrum = fft.analyze(); //draw fft lines

  for (var i=0; i < spectrum.length; i++){ //for loop, i = 0 and is less than spectrum length, increment itself until its spectrum length.
        var freq = spectrum[i]; //frequency is equal to the spectrum. so i=frequency
        var y=map(freq,0,256, height,0); //maps frequency between values of 0-256, between height of sketch and 0
       line(i * w, height, i * w,y); //draw line for each value. i times width of band, and height. i(frequency) x width (2)
     
 }
     
        stroke(127,255,212); //output lines are aqua
  var filterFreq = map(mouseX, 0, width, 60, 20000);   //mouse x is frequency filter map frequency to canvas
  filterFreq = constrain(filterFreq, 60, 20000);   
  var filterRes = map(mouseY, 0, height, 3, 0.01); //mouse y is resonance and delay time
  filterRes = constrain(filterRes, 0.01, 3); //maps dimension of canvas to resonance
  delay.filter(filterFreq, filterRes);
  var delTime = map(mouseY, 0, width, .4, .01); //maps dimension of canvas to delay time 
  delTime = constrain(delTime, .01, .4);
  delay.delayTime(delTime);
}



function mousePressed() {
  soundFile.play();
}

function chkRVB() {
  if (this.checked()) {
      
reverb = new p5.Reverb();
reverb.process(soundFile, 6, 4);
console.log('reverb');
  } else {
reverb.disconnect
console.log('no reverb!');
  }
}

