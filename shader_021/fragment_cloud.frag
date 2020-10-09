#ifdef GL_ES
precision mediump float;
#endif

varying vec3 vNormal;
varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_tex0;

void mainImage(){
    float dist = distance(vec3(sin(-1.0*u_time),0.0,cos(-1.0*u_time)),vNormal); 
    float facing = pow(dist*0.5,4.2);

    vec4 img = vec4(0.0);
    vec4 tex = texture2D(u_tex0, vUv);
    img += mix(
        vec4(tex.xyz - vec3(0.6,0.55,0.4), length(tex.xyz)-0.35),
        vec4(tex.xyz, length(tex.xyz)-0.35),
        facing
    );

    // -0.2 * x^2 + 0.5

    img += vec4(
        pow(clamp(0.9-facing,0.0,1.0),1.8),
        pow(clamp(0.9-facing,0.0,1.0),2.0)*0.36,
        0.0,
        length(tex.xyz)-0.35
    ) * facing +0.1;

    gl_FragColor = img;
}

void main(){
    mainImage();
}