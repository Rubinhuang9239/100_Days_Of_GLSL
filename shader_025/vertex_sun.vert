#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPos;
uniform float u_time;

void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    vPos = vec3(0.0, 0.0, 0.005 * pow(1.0-position.y,1.1) * sin(position.y * 16.0/0.618 + position.y + u_time * 4.0 ));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position + vPos,1.0);
}