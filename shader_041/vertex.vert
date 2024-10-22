#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    v_uv = uv;
    v_normal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}