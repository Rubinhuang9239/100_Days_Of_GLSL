#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleShape(vec2 position, float radius){
    return 1.0-step(radius, length(position - vec2(0.5)));
}

float rectShape(vec2 position, vec2 scale){
    scale = vec2(0.5) - scale * 0.5;
    vec2 shaper = vec2(step(scale.x, position.x), step(scale.y, position.y));
    shaper *= vec2(step(scale.x, 1.0 - position.x), step(scale.y, 1.0 - position.y));
    return shaper.x * shaper.y;
}

mat2 scale(vec2 scale){
    return mat2(scale.x, 0.0, 0.0, scale.y);
}

mat2 rotate(float angle){
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0); 

    coord -= vec2(0.5);
    coord = coord * scale(vec2(2.0 + sin(u_time)));
    coord = coord * rotate(sin(u_time)*8.0);
    coord += vec2(0.5);

    if(rectShape(coord, vec2(0.32))>0.0){
        color += vec3(coord.x * sin(u_time*1.6), coord.y, 1.0);
    }

    if(circleShape(coord, 0.32)>0.0){
        color += vec3(coord.x, coord.y * sin(u_time), 1.0);
    }

    gl_FragColor = vec4(color,1.0);
}