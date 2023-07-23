const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const size = 30;
let direction;
let loopId;

const snake = [
  { x: 300, y: 270 },
  { x: 330, y: 270 },
  { x: 360, y: 270 },
  { x: 390, y: 270 },
  { x: 420, y: 270 },
];

const renderSnake = () => {
  const lastPosition = snake.at(-1);

  ctx.fillStyle = '#ddd';
  return snake.forEach((position) => {
    if (position.x === lastPosition.x && position.y === lastPosition.y) {
      ctx.fillStyle = 'white';
    }
    ctx.fillRect(position.x, position.y, size, size);
  });
};

const moveSnake = () => {
  if (!direction) return;

  const lastPosition = snake.at(-1);

  if (direction === 'right') {
    snake.shift();
    snake.push({ x: lastPosition.x + size, y: lastPosition.y });
  }

  if (direction === 'left') {
    snake.shift();
    snake.push({ x: lastPosition.x - size, y: lastPosition.y });
  }

  if (direction === 'up') {
    snake.shift();
    snake.push({ x: lastPosition.x, y: lastPosition.y - size });
  }

  if (direction === 'down') {
    snake.shift();
    snake.push({ x: lastPosition.x, y: lastPosition.y + size });
  }
};

const gameLoop = () => {
  clearInterval(loopId);

  ctx.clearRect(0, 0, 600, 600);

  moveSnake();
  renderSnake();

  loopId = setTimeout(() => {
    gameLoop();
  }, 250);
};

gameLoop();

document.addEventListener('keypress', ({ key }) => {
  if (key === 'w' && direction != 'down') {
    direction = 'up';
  }

  if (key === 's' && direction != 'up') {
    direction = 'down';
  }

  if (key === 'a' && direction != 'right') {
    direction = 'left';
  }

  if (key === 'd' && direction != 'left') {
    direction = 'right';
  }
});
