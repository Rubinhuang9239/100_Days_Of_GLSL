#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_camPos;
varying vec3 v_normal;
uniform float u_time;

void main(){
    v_uv = uv;
    v_normal = normalMatrix * normal;
    // v_position = position;
    // v_camPos = (modelViewMatrix * vec4(position, 1.0)).xyz;

    vec3 pos = position;

    float angle = atan((-uv.y + 0.5)/(uv.x - 0.5)) * 0.05;
    float dist = distance(uv, vec2(0.5));

    float bump = (1.0 - pow(dist,0.45)) * 0.16 * sin( 40.0 * length(uv - vec2(0.5,0.5)) + angle * 40.0 - u_time * 3.0);
    
    pos.z += bump;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
}