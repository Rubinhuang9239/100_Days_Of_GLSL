#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vFacing;
uniform float u_time;

vec3 getFacing(){
    return smoothstep(vec3(normal.x,normal.y,0.35),vec3(normal.x,normal.y+0.45,1.0), normal);
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
    vNormal = normalMatrix * normal;

    vec3 vPos = position;

    vFacing = getFacing();

    vPos += ((1.0 + 5.5 * noise(vPos.yz)) * sin(vPos.y/6.0 + 0.5*cos(vPos.x / noise(vPos.xz)*4.0 + -3.0 * u_time) + -8.0 * u_time) + 8.5) * mix(vFacing.xyz,vFacing.xzy, noise(vPos.yz*0.2));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPos,1.0);
}