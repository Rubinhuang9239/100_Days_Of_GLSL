#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform sampler2D u_letterTex;
uniform sampler2D u_burnTex;
uniform sampler2D u_stainTex;

varying vec2 v_Uv;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                        vec2(12.9898,78.233)))
                * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
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

    vec3 color = texture2D(u_letterTex, v_Uv.xy).rgb;

    float burnVal = texture2D(u_burnTex, v_Uv.yx).r * 0.75 + texture2D(u_stainTex, v_Uv.yx).r * 0.3;
    burnVal += (sin(u_time * 0.35) * 0.5 + noise(v_Uv * 1.72) * 0.75);

    if(burnVal >= 0.96){
        discard;
    }
    else if( burnVal < 0.96 && burnVal >= 0.90){
        color = vec3(0.1);
    }
    else if( burnVal < 0.90 && burnVal > 0.87){
        float brightVal = 1.0-((burnVal-0.87)/0.03);
        color += vec3(0.1 + 0.96 * brightVal, 0.1 + 0.55 * brightVal, 0.1);
    }

    gl_FragColor = vec4(color,1.0);   
}