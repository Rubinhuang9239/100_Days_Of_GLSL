#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circleShape(vec2 position, float radius){
    return step(radius, length(position));
}

void main(){
    vec2 position = gl_FragCoord.xy/u_resolution;
    vec4 color = vec4(0.1);

    float inCircle = circleShape(position-vec2(0.5), 0.35);

    if(inCircle>0.0){
        color = vec4(1.0-position.x, 1.0-position.y,1.0,1.0);
    }else{
        color = vec4(vec3(1.0-position.x,0.1,position.x),1.0);
    }
    gl_FragColor = color;
}