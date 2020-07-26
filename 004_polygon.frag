#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926525;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float polygonShape(vec2 position, float radius, float sides){
    position = position - 0.5;

    float angle = atan(position.x, position.y);
    float slice = PI * 2.0 / sides;
    return step( radius, cos(floor(0.5 + angle/ slice) * slice - angle) * length(position));
}

void main(){
    vec2 position = gl_FragCoord.xy/u_resolution;
    vec2 mousePos = ((u_mouse.xy/u_resolution) * -1.0) + 0.5;

    vec3 color = vec3(0.0);

    bool inPolygonGroup = (polygonShape(position + vec2(0.2, 0.1) + mousePos * 0.3, 0.15, 6.0) *
        polygonShape(position + vec2(0.3, -0.2) + mousePos * 0.1, 0.08, 6.0) *
        polygonShape(position + vec2(-0.32, -0.3) + mousePos * 0.2, 0.04, 6.0) *
        polygonShape(position + vec2(-0.18, 0.19) + mousePos * 0.15, 0.05, 6.0) * 
        polygonShape(position + vec2(-0.02, 0.338) + mousePos * 0.25, 0.12, 6.0)) <= 0.0;

    bool inMousePolygon = polygonShape(position + mousePos, 0.12, 6.0) <= 0.0;

    if(inMousePolygon || inPolygonGroup){
        color = vec3(position.x * sin(u_time * 1.0), position.y * cos(u_time), 1.0);
    }
    else{
        color = vec3(position.x * sin(u_time * 3.0), position.y * cos(u_time * 2.0), 1.0);
    }

    gl_FragColor = vec4(color, 1.0);
}