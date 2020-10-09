#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_pos;

void main(){
    v_uv = uv;
    v_normal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
    v_pos = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}