#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 vUv;
varying vec3 vNormal;

void mainImage(){
    vec2 coord = vUv;
    coord *= 6.0;
    vec3 color = vec3(0.0);
    for(int n=1; n < 12; n++){
        float i = float(n);
        coord += vec2(0.7 / i * sin(i * coord.y + u_time + 0.3 * i) + 0.8, 0.4 / i * sin(i * coord.x + u_time + 0.7) + 1.6 * i);
    }
    color += vec3(0.5 * sin(coord.x) + 0.5, (0.5 * cos(coord.x) + 0.6), 0.6);

    gl_FragColor = vec4(color, 1.0);
}

void main(){
    mainImage();
}