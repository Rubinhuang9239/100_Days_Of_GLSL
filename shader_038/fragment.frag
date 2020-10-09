#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform sampler2D u_videoTex;
uniform sampler2D u_illuTex;

varying vec2 v_Uv;

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
    vec3 mask = texture2D(u_videoTex, v_Uv).rgb;
    float brightness = (mask.r+mask.g+mask.b)/3.0;
    float invertedBrightness = 1.0-brightness * 1.2;
    // if(invertedBrightness<=0.0125){
    //     discard;
    // }

    float noiseVal = noise(v_Uv * 17.35 + vec2(u_time * 0.5));

    color = texture2D(u_illuTex, (v_Uv + noiseVal * 0.0225)).rgb * invertedBrightness;

    gl_FragColor = vec4(color, 1.0);   
}