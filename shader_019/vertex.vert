#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
varying vec3 vNormal;
uniform float u_time;

float getFacing(float radius, float speed){
    float dist = distance(vec3(sin(speed*u_time)*radius,cos(speed*u_time)*radius,0.0),vNormal); 
    return 1.0-(dist-1.0);
}

float getFacing2(float radius, float speed){
    float dist = distance(vec3(sin(speed*u_time)*radius,0.0,cos(speed*u_time)*radius),vNormal); 
    return 1.0-(dist-1.0);
}

void main() {
    vUv = uv;
    vNormal = normalMatrix * normal;
    float facing_0 = clamp(getFacing(2.75, -1.25), 0.0 , 1.0);
    float facing_1 = clamp(getFacing(2.88, 1.8), 0.0 , 1.0);
    float facing_2 = clamp(getFacing2(2.8, 2.4), 0.0 , 1.0);
    float facing_3 = clamp(getFacing(2.9, 3.0), 0.0 , 1.0);
    vec3 gravitedPosition = position;
    gravitedPosition += facing_0 * normal;
    gravitedPosition += facing_1 * normal;
    gravitedPosition += facing_2 * normal;
    gravitedPosition += facing_3 * normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(gravitedPosition.x, gravitedPosition.y, gravitedPosition.z, 1.0);
}