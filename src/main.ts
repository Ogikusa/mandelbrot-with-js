import { Complex } from "mathjs";
import CONSTANTS from "./constants";
import { createGraph } from "./lib/graph";
import * as mathjs from "mathjs";

const canvasElement = document.querySelector(
  "#main-canvas"
) as HTMLCanvasElement;

if (!canvasElement) {
  throw new Error("Canvas not found");
}

canvasElement.width = CONSTANTS.width;
canvasElement.height = CONSTANTS.height;
const ctx = canvasElement.getContext("2d");
if (!ctx) {
  throw new Error("Canvas context not found");
}
ctx.textBaseline = "top";

const graph = createGraph(CONSTANTS.width, CONSTANTS.height);

graph.setMagnification(0.001);

const graphPoint: string[][] = Array.from({ length: CONSTANTS.height }, () =>
  Array.from({ length: CONSTANTS.width }, () => "#000000")
);

const renderButton = document.querySelector("#render-button");
if (!renderButton) {
  throw new Error("Render button not found");
}
renderButton.addEventListener("click", () => {
  console.log("Rendering...");
  console.time("Rendering");
  calculate();
  render();
  console.timeEnd("Rendering");
  console.log("Rendered!");
});

function calculate() {
  for (let y = 0; y < CONSTANTS.height; y++) {
    for (let x = 0; x < CONSTANTS.width; x++) {
      const point = graph.getRelativePoint(x, y);
      const count = divergeCount(mathjs.complex(point.x, point.y));
      if (count === null) {
        graphPoint[y][x] = `#000000`;
      } else {
        const intensity = count / CONSTANTS.maxIteration;
        graphPoint[y][x] = `rgb(${Math.round(50 * intensity)}, ${Math.round(50 * intensity)}, ${Math.round(255 * intensity)})`;
      }
    }
  }
}

function divergeCount(complex: Complex): null | number {
  let z = mathjs.complex(0, 0);

  for (let i = 0; i < CONSTANTS.maxIteration; i++) {
    z = mathjs.pow(z, 2) as Complex;
    z = mathjs.add(z, complex);
    const distance = Math.sqrt(z.re ** 2 + z.im ** 2);
    if (distance > 2) {
      return i;
    }
  }
  return null;
}

function render() {
  if (!ctx) return;
  for (let y = 0; y < CONSTANTS.height; y++) {
    for (let x = 0; x < CONSTANTS.width; x++) {
      ctx.fillStyle = graphPoint[y][x];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}
