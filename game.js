var c = document.getElementById('c').getContext('2d');
var width = 600;
var height = 300;

var x = 0;
var y = 0;
var i;

var hp = 100;
var maxHP = 100;
var heart = new Image();
heart.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png' //Use offical version when made
var blackHeart = new Image();
blackHeart.src = 'https://www.dictionary.com/e/wp-content/uploads/2018/09/black-heart.png' // Replace with offical too
var lives = [true, true, true];

var inventory = [undefined, undefined, undefined];
var selectedItem = 0;

players = []
var socket = io('http://localhost/');
function recv(message) {
  console.log('Recieveing data...');
  console.log(message);
  data = JSON.parse(message);
  if (data['kind'] == 'player') {
    for (i = 0; i < players.length; i++) {
      if (players[i]['name'] == message['name']) {
        delete players[i]
      }
    }
    players.push(data);
  }
}
socket.on('connect', function () {
  console.log('Connected!')
});
socket.on('message', recv);

function draw() {
  c.clearRect(0, 0, width, height);
  c.fillStyle = '#ffffff';
  c.fillRect(0, 0, width, height);
  for (i = 0; i < lives.length; i++) {
    if (lives[i]) {
      c.drawImage(heart, i * 50, height - 55, 50, 50);
    } else {
      c.drawImage(blackHeart, i * 50, height - 55, 50, 50);
    }
  }
  c.fillStyle = '#000000';
  c.fillRect(25, height - 66, 100, 10);
  c.fillStyle = '#00ff00';
  c.fillRect(25, height - 66, hp * 100 / maxHP, 10);
  for (i = 0; i < inventory.length; i++) {
    if (i == selectedItem) {
      c.strokeStyle = '#ffff00';
    } else {
      c.strokeStyle = '#000000';
    }
    c.strokeRect(i * 50 + 154, height - 55, 50, 50);
  }
}

function update() {  
  socket.send(JSON.stringify({'kind':'player', 'x':x, 'y':y, 'lives':lives, 'hp':hp}));
}

setInterval(update, 500);

function main() {
  draw();
  window.requestAnimationFrame(main);
 }
 
 main();
