#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rectShape(vec2 position, vec2 scale){
    vec2 regScale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2( step(regScale.x,position.x), step(regScale.y,position.y));
    shaper *= vec2( step(regScale.x, 1.0 - position.x), step(regScale.y, 1.0-position.y));
    return shaper.x * shaper.y;
}

void main(){
    vec2 position = gl_FragCoord.xy/u_resolution.xy; 
    vec4 color = vec4(0.0);
    float rect = rectShape(position, vec2(0.3));
    color = vec4(vec3(rect), 1.0);
    gl_FragColor = color;
}