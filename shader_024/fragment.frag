#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec2 vUv;
uniform float u_time;
varying vec3 vFacing;

float getFacing(float radius){
    float dist = distance(vec3(0.0,0.0,1.0),vNormal); 
    return (dist);
}

void mainImage(){
    vec3 color = vec3(0.0,0.0,0.0);
    float facing = getFacing(1.0);
    color += vec3(pow(facing,1.2)-length(vFacing)*0.35, (pow(facing,6.0)-length(vFacing))*0.35,length(vFacing)*0.75);
    gl_FragColor = vec4(
        color,
        1.0
    );
}

void main(){
    mainImage();
}