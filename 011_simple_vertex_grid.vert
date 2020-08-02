#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_color;

void main(){
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 10.0;
    v_color = vec4(1.0);
}