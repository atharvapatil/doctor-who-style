// DOM & canvas element declaration
let button;
let canvas;
let status;

// ml5 style transfer variable declaration
let style;
let video;
let Img;
let dataRecieved = false;
let counter = 0;

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
  if(counter < 1){
  status.innerHTML = "The Doctor has arrived"
}
  counter++;

  console.log('Model Loaded');

  style.transfer(resultStyle);


}

function resultStyle(error, data) {


    setTimeout(function() {
      document.getElementById('status').innerHTML = 'To change your pose click refresh & if you like it save it & share :)';
    }, 3000);



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


  const px = width / 2;
  const py = height / 2;
  const minDim = min(width, height);
  const size = minDim * 0.8;

  const time = millis() / 1000;
  const duration = 5;
  const playhead = time / duration % 1;
  const anim = sin(playhead * PI * 2) * 0.5 + 0.2;
  const thickness = minDim * 0.1 * anim;

  noFill();
  stroke(255);
  strokeWeight(thickness);

  // Draw a circle centred at (px, py)
  ellipse(px, py, size, size);


}
