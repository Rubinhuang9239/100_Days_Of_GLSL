#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_position;
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
    float normalizedPosY = v_position.y + 1.6 + (0.2 * noise(vec2(u_time)*5.0)-0.1);
    vec3 color = vec3(
        pow(normalizedPosY,0.5)*0.45,
        pow(normalizedPosY,2.0)*0.55,
        pow(normalizedPosY,1.5)*1.25
    );
    color += color * 0.05 * (sin(v_uv.x * 31.45926 * 2.0 + noise(vec2(u_time*4.0))));
    color += color * vec3(0.3,0.2,0.05) * (clamp(sin(v_uv.y * 31.45926 * 1.5 + 1.2 * noise(vec2(u_time)))-0.35, 0.0, 1.0));
    color += 0.06 * noise(vec2(v_uv.x*16.0, v_uv.y*32.0 + u_time * 40.0))-0.02;
    gl_FragColor = vec4(
        color,
        pow(normalizedPosY,0.5) * 
        ((1.0-pow(distance(vec3(0.0,0.0,1.0), v_normal),3.4) * (1.2-v_uv.y)))
    );
}