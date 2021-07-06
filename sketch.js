//Global variables
let video;
let classifier;
let label;
let directions;
let isWebcamReady = false;
let stepSize = 12;
let desiredWidth, desiredHeight;

//Loads teachable machine into ml5 before executing any other script
function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bVqnRzx4f/model.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO, function(){
    scaleCanvasToCapture();
    isWebcamReady = true;
  });
  video.hide();

  classifyVideo();
}

function classifyVideo(){
  classifier.classify(video, gotResults);
}

function draw() {
  background(255);

  if (label == 'Hand Up') {
    if (isWebcamReady){
      video.loadPixels();
      // Iterates through pixels in capture, in intervals of 8
      for (let y = 0; y < video.height; y += stepSize) {
        for (let x = 0; x < video.width; x += stepSize) {
          let indexOfRed = (x + y * video.width) * 4;
          // Gets color of current pixel
          let r = video.pixels[indexOfRed];
          let g = video.pixels[indexOfRed + 1];
          let b = video.pixels[indexOfRed + 2];
          let a = video.pixels[indexOfRed + 3];
          // Gets the brightness of the pixel
          let brightness_val = brightness([r, g, b, a]);
          textSize(stepSize - 2);
          // Draws an emoji here given the brightness value
          if (brightness_val > 75){
            text('🤍', x, y);
          } else if (brightness_val > 60){
            text('💛', x, y);
          } else if (brightness_val > 45){
            text('💖', x, y);
          } else if (brightness_val > 30) {
            text('💙', x, y);
          } else if (brightness_val > 15) {
            text('🤎', x, y);
          } else {
            text('🖤', x, y);
          }
        }
      }
    };

    directions = '🤍💛💚💙💜❤️';
  } else {
    //Webcam
    video.loadPixels();
    image(video, 0,0, desiredWidth, desiredHeight);
    directions = 'Raise your hand for some hearts :)';
  }

  //Some text for directions. Directions var changes depending on label state in the if else statement above.
  textSize(24);
    textAlign(CENTER, CENTER);
    fill(255);
    text(directions, width / 2, height - 24);

}

//If input is unrecognized, return error. Change label var to name of classification and call the classifyVideo() each time.
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  //console.log(results[0].label);
  label = results[0].label;
  classifyVideo();
}

//Scale pixel video & webcam proportionally.
function scaleCanvasToCapture() {
  desiredWidth = windowHeight * (video.width / video.height) * 0.9; 
  desiredHeight = windowHeight * 0.9; 
  resizeCanvas(desiredWidth, desiredHeight); 
  video.size(desiredWidth, desiredHeight); 
}