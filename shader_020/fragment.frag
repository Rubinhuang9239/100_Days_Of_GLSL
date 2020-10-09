#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec2 vUv;
uniform float u_time;

float getFacing(float radius){
    float dist = distance(vec3(0.0,0.0,1.0),vNormal); 
    return (dist);
}

void mainImage(){
    vec3 color = vec3(0.0,0.0,0.0);
    float facing = getFacing(1.0);
    // color += vec3(0.0, 0.0, 0.5*facing);
    color += vec3(pow(facing,1.2), pow(facing,6.0)*0.35, 0.0);
    gl_FragColor = vec4(color,1.0);
}

void main(){
    mainImage();
}