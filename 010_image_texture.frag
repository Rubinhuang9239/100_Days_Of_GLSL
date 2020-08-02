#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_tex0;
uniform sampler2D u_tex1;

float circleShape(vec2 position, float radius){
    return 1.0 - smoothstep(radius, radius - 0.3, length(position - vec2(0.5)));
}

float circleShapeHard(vec2 position, float radius){
    return 1.0 - step(radius, length(position - vec2(0.5)));
}

void main(){
    vec2 coord = gl_FragCoord.xy / u_resolution;

    vec4 img = vec4(0.0);

    coord.x = coord.x + u_time * 0.02;
    coord += circleShape(coord-vec2(u_time * 0.02-0.12,0.0), 0.3);
    img += texture2D(u_tex0, coord);

    img += texture2D(u_tex1, coord-vec2(u_time * 0.02 + 0.35 + 0.04 * cos(-0.5 * u_time), 0.1 * sin(u_time)));
    img -= vec4(circleShapeHard(coord-vec2(u_time * 0.02-0.12,0.0), 0.6));

    gl_FragColor = img;
}
// glslViewer 010_image_texture.frag img/star.jpg img/cat.png
