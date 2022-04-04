import { getRandomNumber } from "./numbers";

type Food = { x: number; y: number };

class FoodObject {
  food: Food;
  scale: number = 30;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.food = this.place();
  }

  place() {
    return {
      x: getRandomNumber(0, this.ctx.canvas.width, this.scale),
      y: getRandomNumber(0, this.ctx.canvas.height, this.scale),
    };
  }

  render() {
    const food = this.food;
    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";
    this.ctx.fillRect(food.x, food.y, this.scale, this.scale);
    this.ctx.strokeRect(food.x, food.y, this.scale, this.scale);
  }
}

export default FoodObject;
