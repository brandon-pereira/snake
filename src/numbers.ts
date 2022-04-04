export function getRandomNumber(start: number, end: number, step: number) {
  // the random number
  const num = Math.floor(Math.random() * end) + start;
  // make sure it fits within step
  return num - (num % step);
}

export function getCenterWithinStep(max: number, step: number) {
  const half = max / 2;
  return half - (half % step);
}
