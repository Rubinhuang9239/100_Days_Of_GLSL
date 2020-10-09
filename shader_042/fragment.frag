#ifdef GL_ES
precision mediump float;
#endif

#include <packing>

varying vec2 v_Uv;
uniform sampler2D u_diffuse;
uniform sampler2D u_depth;
uniform float u_cameraNear;
uniform float u_cameraFar;
uniform vec3 u_cameraPos;
uniform float u_time;
uniform vec3[4] u_cornerVecs;
uniform float u_focalDist;

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

void main(){
    vec3 color = vec3(0.0); 

    vec3 depthWorldPos = getWorldPos(v_Uv);

    vec3 inputWorldPos = vec3(0.0);
    
    float dist = distance(inputWorldPos, depthWorldPos);
     

    float focusVal = smoothstep(u_focalDist-16.0,u_focalDist-8.0, dist) * smoothstep(u_focalDist+8.0,u_focalDist-16.0, dist);

    float divideLevel = 0.0016 * clamp(pow(1.0-focusVal,2.0),0.0,1.0);
    int sampleLevel = 9;
    vec3 avgSampleColor = vec3(0.0);

    for(int i = 0; i < sampleLevel; i++){
        for(int j = 0; j < sampleLevel; j++){
            vec2 samplePos = v_Uv + (
                vec2(float(i),float(j)) - vec2(float(sampleLevel)*0.5)
            ) * divideLevel;

            vec3 sampledColor = texture2D(u_diffuse, samplePos).rgb;
            avgSampleColor += sampledColor;
        }
    }
    avgSampleColor /= pow(float(sampleLevel), 2.0);

    gl_FragColor = vec4(avgSampleColor, 1.0);
}