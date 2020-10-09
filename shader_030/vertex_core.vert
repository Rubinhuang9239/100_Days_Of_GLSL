#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;
uniform float u_time;

void main(){
    v_uv = uv;
    v_normal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}