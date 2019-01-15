var c = document.getElementById('c').getContext('2d');
var width = 600;
var height = 300;

var x = 0;
var y = 0;
var hp = 100;
var lives = [true, true, true];
var inventory = [undefined, undefined, undefined];

function draw() {
  c.clearRect(0, 0, width, height);
  for (var i = 0; i < inventory.length; i++) {
    c.strokeStyle = '#000000'
    c.strokeRect(i * 50 + 102, height - 55, 50, 50);
  }
}

function update() {
  
}

function main() {
  update();
  draw();
  window.requestAnimationFrame(main);
 }
 
 main();

