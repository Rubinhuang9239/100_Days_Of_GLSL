#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;
uniform float u_time;

void main(){

    vec3 color = vec3(1.0);

    float dist = distance(vec3(0.0,0.0,1.0), v_normal);

    gl_FragColor = vec4(
        color,
        clamp((1.0-dist) * 2.0, 0.0, 1.0)
    );
}