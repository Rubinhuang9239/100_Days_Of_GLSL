#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_pos;
uniform float u_time;
uniform float u_effective;
uniform sampler2D u_mapTex;
uniform sampler2D u_shadowTex;
uniform vec2 u_resolution;

struct PointLight {
        vec3 color;
        vec3 position;
        float distance;
    };

uniform PointLight pointLights[NUM_POINT_LIGHTS];

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

    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x/u_resolution.y;

    vec2 tile = floor(coord.xy * vec2(4.5));
    vec2 tileCoord = coord.xy * vec2(4.5) - tile;

    vec3 color = vec3(0.0);

    vec3 camDir = normalize(v_pos - vec3(0.6,0.85,0.0));
    float facing = dot(-camDir, v_normal);
    
    if(facing < 22.0){
        color += texture2D(u_shadowTex, tileCoord).rgb * 1.2;
        if(facing < 0.32){
            color -= vec3(0.125);
        }
        else{
            color -= vec3(0.25) * texture2D(u_shadowTex, tileCoord).rgb;
        }
    }
    else{
        color += vec3(1.0);
    }

    vec3 diffuse = texture2D(u_mapTex, v_uv).rgb;

    vec3 addedLights = vec3(0.0, 0.0, 0.0);
    for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
        vec3 lightDirection = normalize(v_pos - pointLights[l].position);
        addedLights.rgb += clamp(dot(-lightDirection, v_normal), 0.0, 1.0)
                            * pointLights[l].color
                            * noise(vec2(u_time * 32.0, 0.0)) * 0.32;
    }

    color = mix(diffuse * (addedLights + vec3(0.9)), color, u_effective);
    if(facing < 11.0){
        color -= vec3(0.85);
    }

    gl_FragColor = vec4(color,1.0);
}