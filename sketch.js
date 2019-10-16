let button;
let c;
let style;
let video;
let resultImg;


function setup() {
  c = createCanvas(300, 300).parent('canvas-container');

  video = createCapture(VIDEO);
  video.hide();

  // The results image from the style transfer
  resultImg = createImg('');
  resultImg.hide();

  // Create a new Style Transfer method with a defined style.
  // We give the video as the second argument
  style = ml5.styleTransfer('models/doctorwho', video, modelLoaded);

  button = document.getElementById('save-image');

  // button.onclick(changeBG);
}

function changeBG() {
  saveCanvas(c, 'myCanvas', 'jpg');
}

function draw() {
  image(resultImg, 0, 0, 300, 300);
}

// A function to call when the model has been loaded.
function modelLoaded() {
  select('#status').html('Model Loaded');
  style.transfer(gotResult);
}

// When we get the results, update the result image src
function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  style.transfer(gotResult);
}
