#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;
uniform vec2 offset;

void main() {;
    // 複素数平面上の座標
    vec2 complex_c = vec2(
        gl_FragCoord.x / 500.0 - offset.x,
        gl_FragCoord.y / 500.0 - offset.y
    );

    // 漸化式の初期値を設定
    vec2 complex_z = vec2(0.0, 0.0);
    for (int i = 0;i < 2048; i++) {
        // ベクトルを用いて擬似的に複素数の二乗して座標を足している
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