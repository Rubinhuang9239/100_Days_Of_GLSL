#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleShape(vec2 position, float radius){
    return 1.0 - smoothstep(radius, radius-0.1, length(position - vec2(0.5)));
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord *= 6.0;
    for(int n=1; n < 12; n++){
        float i = float(n);
        coord += vec2(0.7 / i * sin(i * coord.y + u_time + 0.3 * i) + 0.8, 0.4 / i * sin(i * coord.x + u_time + 0.7) + 1.6 * i);
    }

    vec3 color = vec3(0.0);
    color += vec3(0.5 * sin(coord.x) + 0.5, (0.5 * cos(coord.x) + 0.6), 0.6);

    gl_FragColor = vec4(color, 1.0);
}