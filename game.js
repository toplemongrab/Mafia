var c = document.getElementById('c').getContext('2d');
var width = 600;
var height = 300;

var x = 0;
var y = 0;
var i;

var hp = 100;
var maxHP = 100;
var heart = new Image();
heart.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png' // Use offical version when made
var blackHeart = new Image();
blackHeart.src = 'https://www.dictionary.com/e/wp-content/uploads/2018/09/black-heart.png' // Replace with offical too
var lives = [true, true, true];

var inventory = [undefined, undefined, undefined];
var selectedItem = 0;

var started = false;
var socket;
var name;
players = [];

function recv(message) {
  message = message.data;
  if (message['kind'] == 'player') {
    for (i = 0; i < players.length; i++) {
      if (players[i]['name'] == message['name']) {
        players[i] = message;
      }
    }
  }
}

function start() {
  started = true;
  name = document.getElementById('name').value;
  socket = new WebSocket('wss://apprtc-ws.webrtc.org/ws');
  socket.onmessage = recv;
  socket.onopen = function() { console.log('Connected') };
  players.push({'kind':'player', 'name':name, 'x':x, 'y':y, 'lives':lives, 'hp':hp, 'inventory':inventory, 'selectedItem':selectedItem});
}
  
function draw() {
  c.clearRect(0, 0, width, height);
  c.fillStyle = '#ffffff';
  c.fillRect(0, 0, width, height);
  if (started) {
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
}

function update() {
  if (started) {
    document.getElementById('start').style.display = 'none';
    document.getElementById('name').style.display = 'none';
    if (socket.readyState == 1) {
      socket.send(JSON.stringify({kind:'player', name:name, x:x, y:y, lives:lives, hp:hp, inventory:inventory, selectedItem:selectedItem}));
    }
   } 
}

function main() {
  draw();
  update();
  window.requestAnimationFrame(main);
 }
 
 main();
