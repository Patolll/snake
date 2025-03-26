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
const eyeSize = 5;
const eyeSize2 = 2;
console.log(rows);
console.log(cols);
let direction = { x: 1, y: 0 };
let apple = {
  x: Math.floor((Math.random() * canvas.width) / tileSize) * tileSize,
  y: Math.floor((Math.random() * canvas.height) / tileSize) * tileSize,
};
let gameInterval;
let points = 0;
let resultPoints = document.getElementById("points");
function drawGrid() {
  ctx.strokeStyle = "black";
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
    ctx.beginPath();

    // Draw a rectangle with rounded corners
    ctx.moveTo(segment.x + 10, segment.y);
    ctx.arcTo(
      segment.x + tileSize,
      segment.y,
      segment.x + tileSize,
      segment.y + tileSize,
      10
    );
    ctx.arcTo(
      segment.x + tileSize,
      segment.y + tileSize,
      segment.x,
      segment.y + tileSize,
      10
    );
    ctx.arcTo(segment.x, segment.y + tileSize, segment.x, segment.y, 10);
    ctx.arcTo(segment.x, segment.y, segment.x + tileSize, segment.y, 10);

    ctx.closePath();
    ctx.fill();
  });

  // Draw eyes on the snake head
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(snake[0].x + 28, snake[0].y + 10, eyeSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(snake[0].x + 28, snake[0].y + 30, eyeSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(snake[0].x + 31, snake[0].y + 10, eyeSize2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(snake[0].x + 31, snake[0].y + 30, eyeSize2, 0, Math.PI * 2);
  ctx.fill();

  // Draw the snake's mouth
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(snake[0].x + tileSize, snake[0].y + tileSize / 2);
  ctx.lineTo(snake[0].x + tileSize + 15, snake[0].y + tileSize / 2 - 3);
  ctx.moveTo(snake[0].x + tileSize, snake[0].y + tileSize / 2);
  ctx.lineTo(snake[0].x + tileSize + 15, snake[0].y + tileSize / 2 + 3);
  ctx.stroke();
}

function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(apple.x, apple.y, tileSize, tileSize);
}
function generateApple() {
  let validPosition = false;
  while (!validPosition) {
    apple.x = Math.floor((Math.random() * canvas.width) / tileSize) * tileSize;
    apple.y = Math.floor((Math.random() * canvas.height) / tileSize) * tileSize;

    validPosition = !snake.some(
      (segment) => segment.x === apple.x && segment.y === apple.y
    );
  }
}
function gameLoop() {
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
    generateApple();
    points++;
    resultPoints.textContent = `Points: ${points}`;
  } else {
    snake.pop();
  }
  if (canvasColision() || snakeColision()) {
    return;
  }

  drawApple();
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
function canvasColision() {
  const head = snake[0];
  if (
    head.x === canvas.width + tileSize ||
    head.x === 0 - tileSize * 2 ||
    head.y === canvas.height + tileSize ||
    head.y === 0 - tileSize * 2
  ) {
    stopGame();
    alert("Koniec");
    return true;
  }
  return false;
}

function snakeColision() {
  const head = snake[0];

  for (let i = 1; i < snake.length; i++) {
    const segment = snake[i];
    if (head.x === segment.x && head.y === segment.y) {
      stopGame();
      alert("uderzyles samego siebie");
      return true;
    }
  }
  return false;
}
function startGame() {
  gameInterval = setInterval(gameLoop, 100);
}
function stopGame() {
  clearInterval(gameInterval);
}
startGame();
