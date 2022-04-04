import FoodObject from "./food";
import { getCenterWithinStep } from "./numbers";

type SnakePart = { x: number; y: number };
type Snake = SnakePart[];
type Direction = "DOWN" | "RIGHT" | "LEFT" | "UP";

class SnakeObject {
  snake: Snake;
  direction: Direction = "RIGHT";
  nextDirection?: Direction;
  scale: number = 30;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    console.log(this.ctx.canvas.height);
    this.reset();
  }

  reset() {
    const head = {
      x: getCenterWithinStep(this.ctx.canvas.width, this.scale),
      y: getCenterWithinStep(this.ctx.canvas.height, this.scale),
    };
    this.snake = Array(5)
      .fill("")
      .map((_, i) => ({
        x: -30 * i + head.x,
        y: head.y,
      }));

    console.log(this.snake);
  }

  get head() {
    return this.snake[0];
  }

  setDirection(direction: Direction) {
    if (direction === "RIGHT" && this.direction !== "LEFT") {
      this.nextDirection = direction;
    } else if (direction === "DOWN" && this.direction !== "UP") {
      this.nextDirection = direction;
    } else if (direction === "LEFT" && this.direction !== "RIGHT") {
      this.nextDirection = direction;
    } else if (direction === "UP" && this.direction !== "DOWN") {
      this.nextDirection = direction;
    }
  }

  move() {
    this.direction = this.nextDirection || this.direction;
    this.nextDirection = null;
    const head = { ...this.head };
    switch (this.direction) {
      case "DOWN":
        head.y += this.scale;
        break;
      case "UP":
        head.y -= this.scale;
        break;
      case "LEFT":
        head.x -= this.scale;
        break;
      case "RIGHT":
        head.x += this.scale;
        break;
    }
    this.snake.unshift(head);
    this.snake.pop();
  }

  grow() {
    const tail = this.snake[this.snake.length - 1];
    this.snake.push(tail);
  }

  get isTouchingSelf() {
    return this.snake.find((body, i) => {
      if (i === 0) return false;
      return body.x === this.head.x && body.y === this.head.y;
    });
  }

  touches(food: FoodObject) {
    if (food.food.x === this.head.x && food.food.y === this.head.y) {
      return true;
    }
    return false;
  }

  render() {
    this.snake.forEach((part) => this.drawSnakePart(part));
  }

  private drawSnakePart(part: SnakePart) {
    this.ctx.fillStyle = "#0f0";
    this.ctx.strokeStyle = "#000";
    this.ctx.fillRect(part.x, part.y, this.scale, this.scale);
    this.ctx.strokeRect(part.x, part.y, this.scale, this.scale);
  }
}

export default SnakeObject;
