// Access the canvas. (HTML element where the game is rendered)
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

context.scale(20, 20);
// This tells the drawPieces function how to draw the pieces
const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function createMatrix(w, h) {
  const matrix = [];
  //   This loop creates a 2d array grid of height h and width w, where all positions are 0
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}
// This is used to update the game display continuously

function collide(arena, player) {
  const m = player.matrix;
  const o = player.pos;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawPieces(player.matrix, player.pos);
  drawPieces(arena, { x: 0, y: 0 });
}

// This function reads the piece matrices and renders them on the canvas based on the offset
function drawPieces(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = "red";
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}
9;

function playerDrop() {
  player.pos.y++;
  console.log(collide(arena, player));
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    player.pos.y = 0;
  }
  dropCounter = 0;
}

function playerMove(direction) {
  player.pos.x += direction;
  if (collide(arena, player)) {
    player.pos.x -= direction;
  }
}
let dropCounter = 0;
// rate at which pieces fall (1,000 ms)
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // drops piece one unit every second and resets counter
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

// This event listener checks for key presses
document.addEventListener("keydown", (event) => {
  console.log(event);
  console.log(player.pos);
  switch (event.key) {
    case "ArrowRight":
      playerMove(1);
      break;
    case "ArrowLeft":
      playerMove(-1);
      break;
    case "ArrowDown":
      playerDrop();
      break;
    default:
      console.log("Not a valid input");
  }
});

const arena = createMatrix(12, 20);

const player = {
  pos: { x: 5, y: 5 },
  matrix: matrix,
};

update();
