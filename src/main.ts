import P5 from "p5";
import CONSTANTS from "./constants";
import { createGraph } from "./lib/graph";

const sketch = (p: P5) => {
  let myShader: P5.Shader;
  const offset: GLfloat[] = [0.0, 0.0];
  let zoom: GLfloat = 1.0;
  p.preload = () => {
    myShader = p.loadShader("/mandelbrot.vert", "/mandelbrot.frag");
  };

  p.setup = () => {
    p.createCanvas(CONSTANTS.width, CONSTANTS.height, p.WEBGL);
    p.shader(myShader);
  };

  p.draw = () => {
    myShader.setUniform("resolution", [p.width, p.height]);
    myShader.setUniform("offset", offset);
    myShader.setUniform("zoom", zoom);
    p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  };

  p.keyPressed = () => {
    if (p.key === "a") {
      offset[0] += 0.1 / zoom;
    }
    if (p.key === "d") {
      offset[0] -= 0.1 / zoom;
    }
    if (p.key === "w") {
      offset[1] -= 0.1 / zoom;
    }
    if (p.key === "s") {
      offset[1] += 0.1 / zoom;
    }
    if (p.key === "z") {
      zoom *= 1.1;
    }
    if (p.key === "r") {
      zoom = 1.0;
    }
  };

  p.mouseClicked = () => {
    return;
    // HOW
    offset[0] = (p.mouseX - p.width / 2) / p.width;
    offset[1] = (p.mouseY - p.height / 2) / p.height;
  };
};

new P5(sketch);
