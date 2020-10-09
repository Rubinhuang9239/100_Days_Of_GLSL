#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPos;
uniform float u_time;

float circleShape(vec2 position, float radius){
    return 1.0-step(radius, length(position - vec2(0.5)));
}

void mainImage(){
    float circle = circleShape(vUv, 0.5);
    if(circle <= 0.0 || abs(vPos.z) >= 0.00618){
        discard;
    }
    vec3 color = vec3(0.8 + 0.2 * (1.0-vUv.y),0.80 - 0.6 * (1.0-vUv.y), 0.65 * (1.0-vUv.y)) * circle;
    gl_FragColor = vec4(color, 1.0);
}

void main(){
    mainImage();
}