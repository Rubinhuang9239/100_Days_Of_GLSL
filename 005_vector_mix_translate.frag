#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
const float half_PI = 3.14159265359*0.5;

const vec3 pink = vec3(1.0, 0.45, 0.9);
const vec3 blue = vec3(0.45, 0.9, 1.0);
const vec3 green = vec3(0.4, 1.0, 0.75);
const vec3 orange = vec3(1.0, 0.5216, 0.0078);

float circleShape(vec2 position, float radius){
    return 1.0 - step(radius, length(position - 0.5));
}

float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;

    float sinTime = sin(u_time);
    float cosTime = cos(u_time);

    vec2 cirOrbit = vec2(sinTime * 0.18 * cos(u_time * 0.2), cosTime * 0.18 * sin(u_time * 0.35)); 

    float inCir = circleShape(coord + cirOrbit, 0.15 + 0.025 * cos(u_time * 1.5));
    float inBox = rectShape(coord + vec2(0.0), vec2(0.25));

    float panel_pink = rectShape(coord + 0.25 * vec2(cos(u_time),sin(u_time)), vec2(0.1));
    float panel_blue = rectShape(coord + 0.25 * vec2(cos(u_time + half_PI),sin(u_time + half_PI)), vec2(0.1));
    float panel_green = rectShape(coord + 0.25 * vec2(cos(u_time + 2.0 * half_PI),sin(u_time + 2.0 * half_PI)), vec2(0.1));
    float panel_orange = rectShape(coord + 0.25 * vec2(cos(u_time + 3.0 * half_PI),sin(u_time + 3.0 * half_PI)), vec2(0.1));

    vec3 color = vec3(0.0);

    if(inCir * inBox > 0.0){
        color = mix(
            vec3(coord.x, coord.y, 1.0 * abs(cosTime)),
            vec3(1.0, coord.x, coord.y),
            sinTime
        );
    }else if(inCir > 0.0){

        vec3 cirColor = vec3(coord.x, coord.y, 0.6 * abs(cosTime));

        if(panel_pink > 0.0){
            color = cirColor + vec3(1.0, coord.x, coord.y);
        }
        else if(panel_green > 0.0){
            color = cirColor + vec3(1.0, coord.x, coord.y);
        }
        else if(panel_orange > 0.0){
            color = cirColor + vec3(1.0, coord.x, coord.y);
        }
        else if(panel_blue > 0.0){
            color = cirColor + vec3(1.0, coord.x, coord.y);
        }else{
            color = cirColor;
        }
    }else if(inBox > 0.0){
        color = vec3(1.0, coord.x, coord.y);
    }else{
        if(panel_pink > 0.0){
            color = pink;
        }
        else if(panel_green > 0.0){
            color = green;
        }
        else if(panel_orange > 0.0){
            color = orange;
        }
        else if(panel_blue > 0.0){
            color = blue;
        }
    }

    gl_FragColor = vec4(color, 1.0);
}