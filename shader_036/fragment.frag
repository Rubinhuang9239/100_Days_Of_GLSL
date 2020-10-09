#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform sampler2D u_baseTex;
uniform sampler2D u_blendTex;

varying vec2 v_Uv;

void main(){

    vec4 base = texture2D(u_baseTex, v_Uv);
    vec4 blend = texture2D(u_blendTex, v_Uv);

    vec4 result;

    float modVal = mod(floor(u_time),12.0);

    if(modVal == 0.0){
        float brightness = (blend.r+blend.r+blend.b)/3.0;
        if (brightness < 0.5) {
            result = 2.0 * base * blend;
        }
        else{
            result = vec4(1.0) - 2.0 * (vec4(1.0) - blend) * (vec4(1.0) - base);
        }
    }
    else if(modVal == 1.0){
        float brightness = (blend.r+blend.r+blend.b)/3.0;
        if (brightness < 0.5) {
            result = 2.0 * base * blend + base*base - 2.0 * base*base*blend;
        }
        else{
            result = 2.0 * sqrt(base) * blend - sqrt(base) + 2.0 * base - 2.0 * base*blend;
        }
    }
    else if(modVal == 2.0){
        float brightness = (base.r+base.r+base.b)/3.0;
        if (brightness < 0.5) {
            result = 2.0 * base * blend;
        }
        else{
            result = vec4(1.0) - 2.0 * (vec4(1.0) - blend) * (vec4(1.0) - base);
        }
    }
    else if(modVal == 3.0){
        result = base * blend;
    }
    else if(modVal == 4.0){
        result = vec4(1.0) - ((vec4(1.0) - blend) * (vec4(1.0) - base));
    }
    else if(modVal == 5.0){
        result = min( blend, base ); 
    }
    else if(modVal == 6.0){
        result = max( blend, base );
    }
    else if(modVal == 7.0){
        result = abs( base - blend );
    }
    else if(modVal == 8.0){
        result = vec4(1.0) - abs( vec4(1.0) - base - blend );
    }
    else if(modVal == 9.0){
        result = base + blend - (2.0*base*blend);
    }
    else if(modVal == 10.0){
        result = base / (vec4(1.0) - blend);
    }
    else if(modVal == 11.0){
        result = vec4(1.0) - (vec4(1.0) - base) / blend;
    }
    
    gl_FragColor = result;   
}