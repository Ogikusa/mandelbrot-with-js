import P5 from "p5";
import CONSTANTS from "./constants";

const sketch = (p: P5) => {
  let myShader: P5.Shader;

  p.preload = () => {
    myShader = p.loadShader("/mandelbrot.vert", "/mandelbrot.frag");
  };

  p.setup = () => {
    p.createCanvas(CONSTANTS.width, CONSTANTS.height, p.WEBGL);
    p.shader(myShader);
    p.noLoop();
  };

  p.draw = () => {
    myShader.setUniform("resolution", [p.width, p.height]);
    p.quad(-1, -1, 1, -1, 1, 1, -1, 1);
  };
};

new P5(sketch);
