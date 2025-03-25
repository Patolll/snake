const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileSize = 40;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;
let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

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
    ctx.roundRect(segment.x, segment.y, tileSize, tileSize, 10);
    ctx.fill();
  });

  const head = snake[0];
  const eyeSize = 5;
  const eyeSize2 = 2;

  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(head.x + 28, head.y + 10, eyeSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(head.x + 28, head.y + 30, eyeSize, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(head.x + 31, head.y + 10, eyeSize2, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(head.x + 31, head.y + 30, eyeSize2, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(head.x + tileSize, head.y + tileSize / 2);
  ctx.lineTo(head.x + tileSize + 15, head.y + tileSize / 2 - 3);
  ctx.moveTo(head.x + tileSize, head.y + tileSize / 2);
  ctx.lineTo(head.x + tileSize + 15, head.y + tileSize / 2 + 3);
  ctx.stroke();
}
drawGrid();
drawSnake();
