#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;
varying vec3 vNormal;

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

void mainImage(){
    vec2 coord = vUv;
    coord *= 24.0;
    vec3 color = vec3(0.0);

    for(int n=1; n<5; n++){ 
        float i = float(n);
        coord += vec2(sin(0.7 * i * coord.x + cos(u_time * 0.18 * i + coord.y)), cos(0.2 * coord.y * i + cos(u_time * 0.24 * i + coord.x)));
    }
    
    color += vec3( 0.1 * sin(coord.y * cos(coord.x + u_time*0.3) - u_time) + 0.25, 0.15, 0.4 * cos(coord.y * cos(coord.x + u_time*0.6) - u_time) + 0.65);

    if(color.x > 0.25){
        discard;
    }

    color += vec3(noise(coord+u_time*2.1)*0.15, noise(coord+u_time*1.4)*0.25, 0.0);

    gl_FragColor = vec4(color, noise(coord + u_time) + 0.2);
}

void main(){
    mainImage();
}