
let video;
let classifier;
let label;

let isWebcamReady = false;
let stepSize = 12;

function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NswGtsSoL/model.json');
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
    }
  } else {
    video.loadPixels();
    image(video, 0,0, windowWidth, windowWidth * 0.75);
  }

}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results[0].label);
  label = results[0].label;
  classifyVideo();
}

function scaleCanvasToCapture() {
  video.size(windowWidth, windowHeight); 
}

/* let capture;
let desiredWidth, desiredHeight;
let isWebcamReady = false;
let stepSize = 15;

function preload() {
  createCanvas(500, 500);
  // Create webcam capture
  capture = createCapture(VIDEO, function(){
    scaleCanvasToCapture();
    isWebcamReady = true;
  });
  capture.hide();
}

function draw() {
  background(255);
  if (isWebcamReady){
    capture.loadPixels();
    // Iterates through pixels in capture, in intervals of 8
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        let indexOfRed = (x + y * capture.width) * 4;
        // Gets color of current pixel
        let r = capture.pixels[indexOfRed];
        let g = capture.pixels[indexOfRed + 1];
        let b = capture.pixels[indexOfRed + 2];
        let a = capture.pixels[indexOfRed + 3];
        // Gets the brightness of the pixel
        let brightness_val = brightness([r, g, b, a]);
        textSize(stepSize - 1);
        // Draws an emoji here given the brightness value
        if (brightness_val > 70){
          text('💡', x, y);
        } else if (brightness_val > 45){
          text('🍏', x, y);
        } else if (brightness_val > 20) {
          text('💩', x, y);
        } else {
          text('💣', x, y);
        }
      }
    }
  }
}

function scaleCanvasToCapture() {
  // Sets desired width of canvas to width of the window
  desiredWidth = windowWidth/1.5; 
  // Calculates height according to webcam feed's scale
  desiredHeight = windowWidth * (capture.height / capture.width)/1.5; 
  // Resizes the canvas to the desired dimensions
  resizeCanvas(desiredWidth, desiredHeight); 
  // Uses the .size() method to resize original webcam capture element
  capture.size(desiredWidth, desiredHeight); 
} */