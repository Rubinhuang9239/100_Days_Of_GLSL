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
    gl_FragColor.rgb = diffuse; 

    vec3 depthWorldPos = getWorldPos(v_Uv);

    vec3 inputWorldPos = vec3(-0.5,-1.25,-0.25) - u_cameraPos; 

    float scannerRange = fract(u_time * 0.12);
    float dist = distance(depthWorldPos, inputWorldPos);

    float scanLine = smoothstep(scannerRange * 100.0 - 12.5, scannerRange * 100.0, dist) * (1.0-step(scannerRange * 100.0, dist));

    gl_FragColor.xyz += vec3(0.6 - 1.0 * scannerRange, pow(abs(dist-(scannerRange*100.0-12.5))/12.0,3.0), 0.25 + 2.0 * scannerRange) * scanLine;

    gl_FragColor.a = 1.0;
}