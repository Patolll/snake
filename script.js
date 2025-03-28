const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40;
const rows = Math.floor(canvas.height / tileSize);
const cols = Math.floor(canvas.width / tileSize);

let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

let direction = { x: 1, y: 0 };
let apple = { x: 0, y: 0 };
let points = 0;
let gameRunning = false;
let lastTime = 0;
let gameSpeed = 100;
let resultPoints = document.getElementsByClassName("points");

function drawGrid() {
  ctx.strokeStyle = "white";
  for (let i = 0; i <= cols; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tileSize, 0);
    ctx.lineTo(i * tileSize, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i <= rows; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * tileSize);
    ctx.lineTo(canvas.width, i * tileSize);
    ctx.stroke();
  }
}

function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, tileSize, tileSize);
  });

  ctx.fillStyle = "black";
  ctx.fillRect(snake[0].x + 28, snake[0].y + 10, 5, 5);
  ctx.fillRect(snake[0].x + 28, snake[0].y + 30, 5, 5);
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, tileSize, tileSize);
}

function generateApple() {
  let validPosition = false;
  while (!validPosition) {
    apple.x = Math.floor(Math.random() * cols) * tileSize;
    apple.y = Math.floor(Math.random() * rows) * tileSize;
    validPosition = !snake.some(
      (segment) => segment.x === apple.x && segment.y === apple.y
    );
  }
}

function gameLoop(timestamp) {
  if (!gameRunning) return;

  if (timestamp - lastTime > gameSpeed) {
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawSnake();

    const head = snake[0];
    let newHead = {
      x: head.x + direction.x * tileSize,
      y: head.y + direction.y * tileSize,
    };
    snake.unshift(newHead);

    if (head.x === apple.x && head.y === apple.y) {
      points++;
      for (let i = 0; i < resultPoints.length; i++) {
        resultPoints[i].textContent = `Points: ${points}`;
        generateApple();
      }
    } else {
      snake.pop();
    }

    if (canvasCollision() || snakeCollision()) {
      stopGame();
      return;
    }

    drawApple();
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

function canvasCollision() {
  const head = snake[0];
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    return true;
  }
  return false;
}

function snakeCollision() {
  const head = snake[0];
  return snake
    .slice(1)
    .some((segment) => segment.x === head.x && segment.y === head.y);
}

function startGame() {
  gameRunning = true;
  lastTime = performance.now();
  generateApple();
  requestAnimationFrame(gameLoop);
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
}

function stopGame() {
  gameRunning = false;
  document.getElementById("endScreen").style.display = "block";
}

function restartGame() {
  snake = [
    { x: 200, y: 200 },
    { x: 180, y: 200 },
    { x: 160, y: 200 },
  ];
  direction = { x: 1, y: 0 };
  points = 0;
  for (let i = 0; i < resultPoints.length; i++) {
    resultPoints[i].textContent = `Points: ${points}`;
  }
  document.getElementById("endScreen").style.display = "none";
  startGame();
}

document.getElementById("startGameBtn").addEventListener("click", startGame);
document
  .getElementById("restartGameBtn")
  .addEventListener("click", restartGame);
