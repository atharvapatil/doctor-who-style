// DOM & canvas element declaration
let button;
let canvas;
let status;

// ml5 style transfer variable declaration
let style;
let video;
let Img;
let dataRecieved = false;
let tempImg = 'https://media.giphy.com/media/yOjzfTX6f0K3u/giphy.gif';

function preload() {
  tempImg = loadImage('https://media.giphy.com/media/yOjzfTX6f0K3u/giphy.gif');
}

function setup() {

  document.getElementById('status').classList.add('shimmer');
  canvas = createCanvas(300, 300);
  canvas.parent('canvas-container');

  video = createCapture(VIDEO);
  video.hide();

  Img = createImg('');
  Img.hide();

  style = ml5.styleTransfer('models/doctorwho', video, modelReady);

  button = document.getElementById('save-image');


}

function saveImage() {
  saveCanvas(canvas, 'my-who-style', 'jpg');
  console.log('Image being saved');
}

function modelReady() {
  document.getElementById('status').classList.add('no-shimmer');
  document.getElementById('status').classList.remove('shimmer');
  status = document.getElementById('status')
  status.innerHTML = "The Doctor has arrived"

  console.log('Model Loaded');

  style.transfer(resultStyle);
}

function resultStyle(error, data) {
  Img.attribute("src", data.src);
  dataRecieved = true;
}

function draw() {
  if (dataRecieved === false) {
    looper();
  } else {
    image(Img, 0, 0, 300, 300);
  }
}

function looper() {
  background(0, 0, 0, 40);
  push();
  fill(255);
  noStroke();
  textAlign(CENTER);
  text('TARDIS wooshing sound', 150, 150);
  pop();

  // Center of screen
    const px = width / 2;
    const py = height / 2;

    // We will scale everything to the minimum edge of the canvas
    const minDim = min(width, height);

    // Size is a fraction of the screen
    const size = minDim * 0.8;

    // Get time in seconds
    const time = millis() / 1000;

    // How long we want the loop to be (of one full cycle)
    const duration = 5;

    // Get a 'playhead' from 0..1
    // We use modulo to keep it within 0..1
    const playhead = time / duration % 1;

    // Get an animated value from 0..1
    // We use playhead * 2PI to get a full rotation
    const anim = sin(playhead * PI * 2) * 0.5+ 0.2;

    // Create an animated thickness for the stroke that
    const thickness = minDim * 0.1 * anim;

    // Turn off fill
    noFill();

    // Turn on stroke and make it white
    stroke(255);

    // Apply thickness
    strokeWeight(thickness);

    // Draw a circle centred at (px, py)
    ellipse(px, py, size, size);


}
