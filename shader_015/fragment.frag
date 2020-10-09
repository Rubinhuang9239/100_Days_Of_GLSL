#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;

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

float rectshape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), smoothstep(scale.y, scale.y+0.032, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y,1.0 - position.y));
    return shaper.x * shaper.y;
}

void mainImage(){
    vec2 coord = vUv;
    // vec2 coord = gl_FragCoord.xy/u_resolution; // debug

    vec3 color = vec3(0.0);
    color += vec3(0.65*sin(coord.y*3.14159*2.4-0.5) * (1.0-coord.y), 0.85-pow(coord.y,0.3), sin(coord.y*3.14159) * (1.0-pow(coord.y,0.4)));
    color += vec3(0.0, 0.0, 0.4*(1.0-pow(coord.y,0.4)));
    color += (vec3(0.25 * sin(coord.x + u_time) + 0.5, (0.25 * cos(coord.y + u_time) + 0.5), 0.6)) * 0.32;

    float rect = rectshape(coord, vec2(1.0, 1.0));

    gl_FragColor = vec4(color * rect, (1.0-pow(coord.y,0.75)) * noise(vec2(coord.x*64.0) + u_time * 0.25) * rect);
}

void main(){
    mainImage();
}