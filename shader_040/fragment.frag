#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform sampler2D u_woodTex;

varying vec2 v_Uv;

void main(){
    float decay=0.93;
    float exposure=0.2;
    float density=0.926;
    float weight=0.125;
    int NUM_SAMPLES = 128;

    vec2 tc = v_Uv.xy;

    vec2 deltaTexCoord = tc-vec2(sin(u_time * 0.38) * 0.2 + 0.4, cos(u_time * 0.38) * 0.2 + 0.4 );
    deltaTexCoord *= 1.0 / float(NUM_SAMPLES) * density;
    float illuminationDecay = 1.0;
    vec4 color =texture2D(u_woodTex, tc)*0.4;
    for(int i=0; i < NUM_SAMPLES ; i++)
    {
        tc -= deltaTexCoord;
        vec4 diffuse = texture2D(u_woodTex, tc)*0.4;
        diffuse *= illuminationDecay * weight;
        color += diffuse;
        illuminationDecay *= decay;
    }
    gl_FragColor = color;
}