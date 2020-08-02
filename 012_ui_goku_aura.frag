#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;
    coord *= 16.0;
    vec3 color = vec3(0.0);

    for(int n=1; n<5; n++){ 
        float i = float(n);
        coord += vec2(sin(0.7 * i * coord.x + cos(u_time * 0.18 * i + coord.y)), cos(0.2 * coord.y * i + cos(u_time * 0.24 * i + coord.x)));
    }
    
    color += vec3( 0.1 * sin(coord.y * cos(coord.x + u_time*0.3) - u_time) + 0.25, 0.1, 0.4 * cos(coord.y * cos(coord.x + u_time*0.6) - u_time) + 0.65);

    gl_FragColor = vec4(color, 1.0);
}