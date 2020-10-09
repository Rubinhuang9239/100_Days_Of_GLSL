#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vUv;
varying vec3 vPos;
uniform sampler2D u_tex0;

float circleShape(vec2 position, float radius){
    return smoothstep(radius, radius-0.05, length(position - vec2(0.5)));
}

void mainImage(){

    float circle = circleShape(vUv.xy, 0.5); 

    vec4 img = texture2D(u_tex0, vUv);

    float alpha = 1.0;
    if(img.y > 0.824){
        alpha = distance(vec3(1.0), img.xyz);
    }

    gl_FragColor = vec4(img.xyz*0.55, alpha*circle);
}

void main(){
    mainImage();
}