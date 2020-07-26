#ifdef GL_ES
precision mediump float;
#endif

void main(){
    vec3 color = vec3(0.3,0.4,0.5);
    gl_FragColor = vec4(color,1.0);
}