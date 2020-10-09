#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_pos;
uniform float u_time;
uniform sampler2D u_shadowTex;
uniform vec2 u_resolution;

void main(){

    vec2 coord = gl_FragCoord.xy / u_resolution;
    coord.x *= u_resolution.x/u_resolution.y;

    vec2 tile = floor(coord.xy * vec2(4.5));
    vec2 tileCoord = coord.xy * vec2(4.5) - tile;

    vec3 color = vec3(0.0);

    vec3 camDir = normalize(v_pos - vec3(0.08,0.12,0.0));
    float facing = clamp(dot(-camDir, v_normal), 0.0, 1.0);

    // color += facing * vec3(1.0,1.0,1.0) * 1.0;

    if(facing < 0.175){
        color += vec3(0.15);
    }
    else if(facing < 0.36){
        color += texture2D(u_shadowTex, tileCoord).rgb * 1.2;
        if(facing < 0.32){
            color -= vec3(0.15);
        }
        else{
            color -= vec3(0.25) * texture2D(u_shadowTex, tileCoord).rgb;
        }
    }
    else{
        color += vec3(1.0);
    }

    gl_FragColor = vec4(color,1.0);
}