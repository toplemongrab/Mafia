var c = document.getElementById('c').getContext('2d');
var width = 500;
var height = 500;

var x = 0;
var y = 0;
var hp = 100;
var lives = [true, true, true];
var inventory = [undefined, undefined, undefined];

function draw() {
  //c.clearRect(0, 0, width, height);
  c.strokeStyle = '#ff0000';
  c.font = '16px Arial'
  for (var i = 0; i < lives.length; i++) {
    if (lives[i]) {
      c.arc(i * 25, height - 30, 25, 0, 2 * Math.PI);
    }
  }
  for (var i = 0; i < inventory.length; i++) {
    c.strokeStyle = '#000000'
    c.strokeRect(i * 25 + 100, height - 55, 50, 50);
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


