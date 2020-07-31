#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926;

float circle(vec2 position, float radius, float smooth){
    return smoothstep(radius, radius-smooth, length(position - vec2(0.5)));
}

void main(){
    vec2 uv = gl_FragCoord.xy/u_resolution;
    uv.x = uv.x * u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    color += vec3(circle(uv,0.2 + sin(u_time)*0.2,0.4));
    color += vec3(circle(uv + vec2(sin(u_time*0.3 + + 0.666*PI),cos(u_time*0.8 + 0.666*PI))*0.2,0.3,0.4),0.0,0.2);
    color += vec3(0.0,0.0,circle(uv + vec2(sin(u_time * 0.7 + + 0.666*2.0*PI),cos(u_time*0.2 + 0.666*2.0*PI))*0.2,0.3,0.4));
    color += vec3(0.0,circle(uv + vec2(sin(u_time*1.3 + + 0.666*3.0*PI),cos(u_time*0.6 + 0.666*3.0*PI))*0.2,0.3,0.4),0.0);

    color -= vec3(circle(uv,0.25 * 0.1 + abs(0.32 * sin(u_time*0.16)),0.06));


    gl_FragColor = vec4(color, 1.0);
}