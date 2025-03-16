#ifdef GL_ES
precision highp float;
#endif

uniform vec2 resolution;
uniform vec2 offset;
uniform float zoom;

void main() {;
    // フラグメントシェーダーの座標を0.0 - 1.0の範囲に正規化
    float aspectRatio = resolution.x / resolution.y;
    vec2 uv = gl_FragCoord.xy / resolution * 2.0 - 1.0;
    uv.x *= aspectRatio; // X軸を補正


    // 複素数平面上の座標
    vec2 complex_c = vec2(
        uv.x / zoom - offset.x ,
        uv.y / zoom - offset.y
    ); 

    // 漸化式の初期値を設定
    vec2 complex_z = vec2(0.0, 0.0);
    for (int i = 0;i < 16384; i++) {
        // ベクトルを用いて擬似的に複素数の二乗して座標を足している
        complex_z = vec2(
            complex_z.x * complex_z.x - complex_z.y * complex_z.y + complex_c.x,
            2.0 * complex_z.x * complex_z.y + complex_c.y
        );

        if(length(complex_z) > 2.0){
             gl_FragColor = vec4(i/ 16384, i / 128, i / 256, 1.0);
             return;
        }
    }
     gl_FragColor = vec4(0, 0, 0, 1.0);
}