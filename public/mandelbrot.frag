#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;

void main() {
    float r = 0.0;
    float g = gl_FragCoord.x / resolution.x / 10.0;
    float b = gl_FragCoord.y / resolution.y;
     gl_FragColor = vec4(r, g, b, 1.0);
}