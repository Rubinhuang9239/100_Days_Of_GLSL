#ifdef GL_ES
precision mediump float;
#endif

#include <packing>

varying vec2 v_Uv;
uniform sampler2D u_diffuse;
uniform sampler2D u_depth;
uniform sampler2D u_styleTex;
uniform sampler2D u_effectTex;
uniform float u_cameraNear;
uniform float u_cameraFar;
uniform vec3 u_cameraPos;
uniform float u_time;
uniform vec3[4] u_cornerVecs;
uniform vec2 u_radCenter;
uniform float u_effective;
uniform vec2 u_resolution;
uniform bool u_animationDone;

// uniform vec2 u_screenInputPos;

float readDepth( sampler2D depthSampler, vec2 coord ) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float viewZ = perspectiveDepthToViewZ( fragCoordZ, u_cameraNear, u_cameraFar );
    return viewZToOrthographicDepth( viewZ, u_cameraNear, u_cameraFar );
}

vec3 getWorldPos(vec2 coord){
    vec3 dirU = (u_cornerVecs[1] - u_cornerVecs[0]) * coord.x;
    vec3 dirV = (u_cornerVecs[2] - u_cornerVecs[0]) * (1.0-coord.y);
    vec3 farVec = u_cornerVecs[0] + dirU + dirV - u_cameraPos;
    float depth = readDepth(u_depth, coord);
    return (farVec * depth);
}

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

    vec3 diffuse = texture2D( u_diffuse, v_Uv ).rgb;
    vec3 color = diffuse;

    float diffDepthStep = 0.001;
    float diffThreashold = 0.016;

    vec2 origin = vec2((u_radCenter.x + 1.0) * 0.5, (u_radCenter.y + 1.0) * 0.5);

    float angle = (atan((-v_Uv.y + origin.y)/(v_Uv.x - origin.x)));

    float mag = noise(vec2(angle * 80.0 + u_time * 16.0));
    int loop = int( pow(noise(vec2(angle * 64.0 - u_time * 32.0)) * 20.0, 1.6) + 4.0);

    float innerDepth = readDepth(u_depth, v_Uv.xy);
    vec2 radDir = normalize(v_Uv.xy - origin);

    for(int i=0; i < loop; i++){

        float outterDepth = readDepth(u_depth, v_Uv.xy - radDir * diffDepthStep * float(i));

        float depthDiff = abs(innerDepth - outterDepth);
        if(
            depthDiff > diffThreashold
        ){
            color = mix(vec3( step(0.5, mag) * 2.0 - 1.0), diffuse, 0.8 + 0.2 * (1.0-u_effective));
        }   
    }

    if(innerDepth > 0.95){

        float aspect = u_resolution.x/u_resolution.y;

        float dist = distance(origin, v_Uv * vec2(aspect,1.0) + vec2((1.0-aspect)*0.5,0.0));
        color += vec3(pow((1.0 + 0.34 * (1.0 - (u_effective + 0.15) * (0.96 + 0.08 * noise(vec2(u_time * 32.0, 0.0))) ))-dist,32.0));

        float frac = fract(u_time * 4.5);

        float pulse = smoothstep(
                0.7 + frac, 0.0 + frac,
                dist + noise(vec2(
                    v_Uv.x * (1.0 + 0.15 * sin(0.12+u_time * 1.54)),
                    v_Uv.y * (1.0 + 0.15 * cos(0.24+u_time * 1.35))
                ) * 3.25) * 0.5
            ) * smoothstep(0.0 + frac, 0.7 + frac, dist);
        color -= vec3(pulse) * (u_effective * 2.0 - 1.0);

        if(u_animationDone){
            color += ((0.5-dist) * 0.5 + pulse) * texture2D(u_effectTex, v_Uv).rgb * 0.72 * noise(v_Uv * 6.0 + u_time * 9.0);
        }

        color -= vec3(smoothstep(0.32, 0.57, dist)) * 0.7 * (1.0-u_effective);
        color += clamp(color.b - 0.75, 0.0, 0.5) * vec3(1.0 - texture2D(u_styleTex, v_Uv).r) * 0.35;

        color += vec3( clamp((abs(abs(angle) - 0.75) / 2.0) * (u_effective * 1.5 - 1.0) * 0.75, -0.1, 1.0) );
    }

    gl_FragColor = vec4(color,1.0);   
}