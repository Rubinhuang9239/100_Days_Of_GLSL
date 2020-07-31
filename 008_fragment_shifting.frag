#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleShape(vec2 position, float radius){
    return smoothstep(radius, radius - 0.1 * abs(sin(cos(u_time*0.4))), length(position - vec2(0.5)));
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    vec3 color;
    color += vec3(
        sin(cos(coord.x*3.0) * u_time + circleShape(coord + vec2(sin(u_time)*0.1, cos(u_time) * 0.1), 0.4)) + 
        cos(sin(coord.y*3.0) * u_time + circleShape(coord, 0.3)) +
        sin((1.0-coord.y*3.0) * u_time - circleShape(1.0-coord, 0.2)) +
        cos(sin(1.0-coord.y*3.0) * u_time - circleShape(1.0-coord + vec2(sin(-1.0 * u_time)*0.1, cos(u_time) * 0.1), 0.1))
    );

    color *= vec3(1.0, cos(coord.y), sin(coord.x));

    gl_FragColor = vec4(color, 1.0);
}

