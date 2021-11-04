let canvas, ctx;

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  document.addEventListener("keydown", keyDownEvent);

  // velocidade do corpo
  let x = 8;
  setInterval(draw, 1000 / x);
};

// tela canvas = 25x25 = 625 
let gridSize = (tileSize = 25);
let nextX = (nextY = 0);

// Chucrute (corpo)
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let wormTrail = [];
let wormX = (wormY = 10);

// uvinha kkkk
let grapeX = (grapeY = 20);

// desenha
function draw() {
  wormX += nextX;
  wormY += nextY;

  // chucrute limete de tela
  if (wormX < 0) {
    wormX = gridSize - 1;
  }
  if (wormX > gridSize - 1) {
    wormX = 0;
  }

  if (wormY < 0) {
    wormY = gridSize - 1;
  }
  if (wormY > gridSize - 1) {
    wormY = 0;
  }

  //Chucrute comeu a uva?
  if (wormX == grapeX && wormY == grapeY) {
    tailSize++;

    grapeX = Math.floor(Math.random() * gridSize);
    grapeY = Math.floor(Math.random() * gridSize);
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "purple";
  ctx.fillRect(grapeX * tileSize, grapeY * tileSize, tileSize, tileSize);

  ctx.fillStyle = "green";
  for (let i = 0; i < wormTrail.length; i++) {
    ctx.fillRect(
      wormTrail[i].x * tileSize,
      wormTrail[i].y * tileSize,
      tileSize,
      tileSize
    );
    //mordeu o rabo
    if (wormTrail[i].x == wormX && wormTrail[i].y == wormY) {
      tailSize = defaultTailSize;
    }
  }



  //define ordem de crescimento
  wormTrail.push({ x: wormX, y: wormY });
  while (wormTrail.length > tailSize) {
    wormTrail.shift();
  }
}

// input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
  }
}