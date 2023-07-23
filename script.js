const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('h1 > span');
const gameOverScore = document.querySelector('p > span');
const section = document.querySelector('section');
const btn = document.querySelector('button');

const audio = new Audio('./assets/audio.mp3');

const size = 30;
let direction;
let loopId;

let snake = [{ x: 330, y: 270 }];

const randomPosition = (min, max) => {
  return Math.round(Math.random() * (max - min + 1) + min);
};

const foodPosition = () => {
  return Math.round(randomPosition(size, canvas.width - size) / size) * size;
};

const randomFoodColor = () => {
  const red = randomPosition(0, 255);
  const blue = randomPosition(0, 255);
  const green = randomPosition(0, 255);

  return `rgb(${red}, ${green}, ${blue})`;
};

const food = {
  x: foodPosition(),
  y: foodPosition(),
  color: randomFoodColor(),
};

const renderFood = () => {
  const samePosition = snake.find(
    (position) => position.x === food.x && position.y === food.y,
  );

  if (samePosition) {
    food.x = foodPosition();
    food.y = foodPosition();
    food.color = randomFoodColor();
  }

  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, size, size);
};

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
    snake.push({ x: lastPosition.x + size, y: lastPosition.y });
  }

  if (direction === 'left') {
    snake.push({ x: lastPosition.x - size, y: lastPosition.y });
  }

  if (direction === 'up') {
    snake.push({ x: lastPosition.x, y: lastPosition.y - size });
  }

  if (direction === 'down') {
    snake.push({ x: lastPosition.x, y: lastPosition.y + size });
  }

  snake.shift();
};

const gameOver = () => {
  direction = '';
  canvas.style.filter = 'blur(2px)';
  section.style.display = 'flex';
  gameOverScore.innerText = score.innerText;
};

const snakeColission = () => {
  const head = snake.at(-1);

  if (
    head.x < 0 ||
    head.x > canvas.width - size ||
    head.y < 0 ||
    head.y > canvas.height - size
  ) {
    gameOver();
  }

  snake.find((position, index) => {
    if (
      index != snake.length - 1 &&
      head.x === position.x &&
      head.y === position.y
    ) {
      gameOver();
    }
  });

  if (head.x === food.x && head.y === food.y) {
    snake.push(head);

    audio.play();

    score.innerText = +score.innerText + 10;

    food.x = foodPosition();
    food.y = foodPosition();
    food.color = randomFoodColor();
  }
};

const gameLoop = () => {
  clearInterval(loopId);

  ctx.clearRect(0, 0, 600, 600);

  moveSnake();
  renderSnake();
  snakeColission();
  renderFood();

  loopId = setTimeout(() => {
    gameLoop();
  }, 150);
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

btn.addEventListener('click', () => {
  direction = '';
  canvas.style.filter = 'none';
  section.style.display = 'none';
  gameOverScore.innerText = '00';
  score.innerText = '00';

  snake = [{ x: 330, y: 270 }];
  food.x = foodPosition();
  food.y = foodPosition();
  food.color = randomFoodColor();
});
