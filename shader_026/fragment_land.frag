#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
uniform float u_time;

float circleShape(vec2 position, float radius){
    return smoothstep(radius, radius-0.2, length(position - vec2(0.5)));
}

void mainImage(){
    vec3 color = vec3(0.0);

    float horiGrid = 0.1;
    if( 
        abs(sin(vUv.y * 26.0 + u_time * 6.0)) <= 0.02 ||
        abs(sin(vUv.x * 10.0 * 3.1415)) <= 0.02
    ){
        color = vec3(0.25+0.75*vUv.y,0.0,1.0-0.75*vUv.y);
        color.y += circleShape(vUv+vec2(0.0,-0.5), 0.382)*0.4;
    }
    else{
        discard;
    }
    gl_FragColor = vec4(color, 1.0);
}

void main(){
    mainImage();
}