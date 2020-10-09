#ifdef GL_ES
precision highp float;
#endif

#include <packing>

varying vec2 v_Uv;
uniform sampler2D u_diffuse;
uniform sampler2D u_addOnDiffuse;
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
    vec3 addOnDiffuse = texture2D(u_addOnDiffuse, v_Uv).rgb;

    vec3 depthWorldPos = getWorldPos(v_Uv.xy);

    float dist = distance(depthWorldPos, vec3(0.0, 0.0, 0.0) - u_cameraPos);

    if( dist < 16.0){
        // gl_FragColor.rgb += diffuse + vec3(0.85, 0.5, 0.0) / (dist*0.025);
        //discard;
        gl_FragColor.rgb += addOnDiffuse;
    }
    else{
        gl_FragColor.rgb += diffuse;
        gl_FragColor.rgb += vec3(0.44, 0.2, 0.0) * 0.36/(dist-16.0);
    }
    

    gl_FragColor.a = 1.0;   
}