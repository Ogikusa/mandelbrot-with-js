#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;

void main() {;
    // フラグメント座標を複素数平面上の座標に変換
    vec2 complex_c = vec2(
        gl_FragCoord.x / resolution.x,
        gl_FragCoord.y / resolution.y
    );

    vec2 complex_z = vec2(0.0, 0.0);
    for (int i = 0;i < 2048; i++) {
        complex_z = vec2(
            complex_z.x * complex_z.x - complex_z.y * complex_z.y + complex_c.x,
            2.0 * complex_z.x * complex_z.y + complex_c.y
        );

        if(length(complex_z) > 2.0){
             gl_FragColor = vec4(255, 255, 255, 1.0);
             return;
        }
    }
     gl_FragColor = vec4(0, 0, 0, 1.0);
}