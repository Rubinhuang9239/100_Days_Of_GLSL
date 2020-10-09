#ifdef GL_ES
precision highp float;
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
    vec3 diffuse = texture2D( u_diffuse, v_Uv ).rgb;

    vec3 depthWorldPos = getWorldPos(v_Uv.xy);

    float diffDepthStep = 0.0020;
    float diffThreashold = 0.000001;

    float cntDepth = readDepth(u_depth, v_Uv.xy);
    float leftDepth = readDepth(u_depth, vec2(v_Uv.x - diffDepthStep, v_Uv.y));
    float upDepth = readDepth(u_depth, vec2(v_Uv.x, v_Uv.y - diffDepthStep));

    float depthDiff_left = abs(cntDepth - leftDepth);
    float depthDiff_up = abs(cntDepth - upDepth);

    float clampedFadeDist = clamp(distance(vec3(sin(u_time*0.75) * 5.5, 0.0, 0.0)-u_cameraPos, depthWorldPos),0.0,3.5);
    float transitVal = pow(clampedFadeDist/3.5, 3.5);
    
    gl_FragColor.rgb += mix(vec3(0.08), diffuse, transitVal);

    if(
        depthDiff_left > diffDepthStep ||
        depthDiff_up > diffDepthStep
    ){
        gl_FragColor.rgb = mix(vec3(transitVal*2.0, 0.5, 0.9), diffuse, transitVal);
    }

    gl_FragColor.a = 1.0;   
}