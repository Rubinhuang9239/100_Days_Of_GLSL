#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

void mainImage(){
    float dist = distance(vec3(sin(-1.0*u_time),0.0,cos(-1.0*u_time)),vNormal); 
    float facing = dist-1.0;
    vec4 img = vec4(0.0);
    img += mix(texture2D(u_tex1, vUv),texture2D(u_tex0, vUv),facing);
    gl_FragColor = img;
}

void main(){
    mainImage();
}