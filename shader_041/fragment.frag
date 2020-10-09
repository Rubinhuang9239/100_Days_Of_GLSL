#ifdef GL_ES
precision mediump float;
#endif

uniform float u_effectness;
uniform float u_time;
uniform sampler2D u_noiseTex;

varying vec2 v_uv;
varying vec3 v_normal;

void main(){

    vec2 tile_0 = floor(v_uv * vec2(1.25));
    vec2 tileCoord_0 = v_uv * vec2(1.25) - tile_0;

    vec2 tile_1 = floor(v_uv * vec2(8.25));
    vec2 tileCoord_1 = v_uv * vec2(8.25) - tile_1;

    vec3 noiseTex = texture2D(u_noiseTex, tileCoord_1).rgb;
    float noiseBrightness = (noiseTex.r+noiseTex.g+noiseTex.b)/3.0;

    noiseTex = texture2D(u_noiseTex, tileCoord_0).rgb;
    float noiseEdge = (noiseTex.r+noiseTex.g+noiseTex.b)/3.0;

    float verticalVal = pow(dot(v_normal, vec3(0.0, 0.0, 1.0)),6.0);
    if(verticalVal < u_effectness - noiseEdge * 0.25){
        discard;
    }
    vec4 color = vec4(vec3(1.0), noiseBrightness + 0.52);

    gl_FragColor = color;
}