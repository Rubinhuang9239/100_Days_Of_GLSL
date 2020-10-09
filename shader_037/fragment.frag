#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform sampler2D u_videoTex;

uniform float u_effectRadius;
uniform float u_bias;

varying vec2 v_Uv;

float circleShape(vec2 position, float radius){
    return smoothstep(radius, radius - 0.2, length(position - vec2(0.5)));
}

void main(){
    float result_r = texture2D(u_videoTex, v_Uv + vec2(-0.03 * u_bias,0.0)).r;
    float result_g = texture2D(u_videoTex, v_Uv).g;
    float result_b = texture2D(u_videoTex, v_Uv + vec2(0.003 * u_bias,0.0)).b;
    vec3 color = vec3(result_r, result_g, result_b);

    color = mix(
        vec3(result_r, result_g, result_b),
        texture2D(u_videoTex, v_Uv).rgb,
        circleShape(v_Uv, 1.0-u_effectRadius)
    );

    gl_FragColor = vec4(color, 1.0);   
}