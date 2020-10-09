#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_camPos;
uniform float u_time;

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

void main(){

    vec3 color = vec3(0.0);

    float dist = distance(v_uv, vec2(0.5))*2.0;

    float angle = atan((-v_uv.y + 0.5)/(v_uv.x - 0.5)) * 0.05;

    color += vec3(1.0 - pow(dist,1.25), 1.0 - pow(dist,1.2), 0.75 - 0.75*pow(dist,3.2));
    
    float bump = (1.0 - pow(dist,0.45)) * 0.5 * sin( 40.0 * length(v_uv - vec2(0.5,0.5)) + angle * 40.0 - u_time * 3.0);

    float noiseVal = noise(v_uv.xy * 20.0 + vec2(u_time,0.0));

    color += vec3(bump * 0.65, bump * 0.65, bump * 0.25);

    float groups = smoothstep(0.05, 0.425, bump);

    color += groups * vec3(pow(noiseVal,2.0),0.0, noiseVal); 

    //color += vec3(v_normal.x, v_normal.y, 0.0);

    gl_FragColor = vec4(
        color,
        // 1.0
        1.0 - pow(dist,16.0)
    );
}