#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec2 vUv;
uniform float u_time;

float getFacing(float radius, float speed){
    float dist = distance(vec3(sin(speed*u_time)*radius,cos(speed*u_time)*radius,0.0),vNormal); 
    return 1.0-(dist-1.0);
}

float getFacing2(float radius, float speed){
    float dist = distance(vec3(sin(speed*u_time)*radius,0.0,cos(speed*u_time)*radius),vNormal); 
    return 1.0-(dist-1.0);
}

void mainImage(){
    float facing_0 = clamp(getFacing(2.75, -1.25), 0.0 , 1.0);
    float facing_1 = clamp(getFacing(2.88, 1.8), 0.0 , 1.0);
    float facing_2 = clamp(getFacing2(2.8, 2.4), 0.0 , 1.0);
    float facing_3 = clamp(getFacing(2.9, 3.0), 0.0 , 1.0);
    vec4 color = vec4(vUv.x*0.75,0.2+sin(u_time)*0.1,vUv.y*0.75, 1.0);
    color += vec4(facing_0*2.0,0.0,facing_0, facing_0);
    color += vec4(facing_1,0.0,facing_1*2.0, facing_1);
    color += vec4(0.0,facing_2*2.0,facing_2, facing_2);
    color += vec4(0.0,facing_3*2.0,facing_3, facing_3);
    gl_FragColor = color;
}

void main(){
    mainImage();
}