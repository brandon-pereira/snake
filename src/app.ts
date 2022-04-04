import Food from "./food";
import Snake from "./snake";
import Points from "./points";

function setInstructionsVisible(state: boolean) {
  document
    .querySelector('[data-component="instructions"]')
    .classList.toggle("hidden", !state);
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - (window.innerWidth % 30);
canvas.height = window.innerHeight - (window.innerHeight % 30);

let started = false;
let snake: Snake;
let food: Food;
function onTick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!snake) {
    snake = new Snake(ctx);
    food = new Food(ctx);
  } else {
    snake.move();
  }
  if (hasHadCollision()) {
    setInstructionsVisible(true);
    started = false;
    snake = null;
    food = null;
    Points.clear();
    return;
  }
  if (snake.touches(food)) {
    snake.grow();
    Points.add(10);
    food = new Food(ctx);
  }
  food.render();
  snake.render();
}

function hasHadCollision() {
  const h = snake.head;
  return Boolean(
    snake.isTouchingSelf ||
      h.x < 0 ||
      h.y < 0 ||
      h.x >= ctx.canvas.width ||
      h.y >= ctx.canvas.height
  );
}

document.addEventListener("keydown", (e) => {
  if (e.key === " " && !started) {
    setInstructionsVisible(false);
    started = true;
  }
  if (!started) {
    return;
  }
  if (e.key === "ArrowDown") {
    snake.setDirection("DOWN");
  } else if (e.key === "ArrowUp") {
    snake.setDirection("UP");
  } else if (e.key === "ArrowLeft") {
    snake.setDirection("LEFT");
  } else if (e.key === "ArrowRight") {
    snake.setDirection("RIGHT");
  }
});

// call onTick once every second, uses RAF instead of interval
var last = 0;
function render(now: number) {
  if (started) {
    if (!last || now - last >= 100) {
      last = now;
      onTick();
    }
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
