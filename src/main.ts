import P5 from "p5";
import CONSTANTS from "./constants";

const sketch = (p: P5) => {
  let myShader: P5.Shader;

  let offset: GLfloat[] = [2.0, 0.75];

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
    p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  };

  p.keyPressed = () => {
    if (p.key === "a") {
      offset[0] += 0.1;
    }
    if (p.key === "d") {
      offset[0] -= 0.1;
    }
    if (p.key === "w") {
      offset[1] -= 0.1;
    }
    if (p.key === "s") {
      offset[1] += 0.1;
    }
  };
};

new P5(sketch);
