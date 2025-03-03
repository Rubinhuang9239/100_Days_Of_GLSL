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

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                        vec2(12.9898,78.233)))
                * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vUv = uv;
    vNormal = normalMatrix*normal;

    float noise_a = noise(vec2(position.x*1.83, position.y*2.21)+u_time) * 0.12 - 0.07;
    float noise_b = noise(vec2(position.x*1.74, position.y*1.95)+u_time) * 0.12 - 0.07;
    float noise_c = noise(vec2(position.x*2.05, position.y*2.06)+u_time) * 0.12 - 0.07;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x + normal.x * noise_a, position.y + normal.y * noise_b, position.z + normal.z * noise_c, 1.0 );
}