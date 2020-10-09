precision highp float;

    varying vec2 vUv;
    varying vec3 vecPos;
    varying vec3 vecNormal;

    uniform float lightIntensity;
    uniform sampler2D tex_0;

    struct PointLight {
        vec3 color;
        vec3 position; // light position, in camera coordinates
        float distance; // used for attenuation purposes. Since
                        // we're writing our own shader, it can
                        // really be anything we want (as long as
                        // we assign it to our light in its
                        // "distance" field
    };

    uniform PointLight pointLights[NUM_POINT_LIGHTS];

    float getFacing(float radius){
        float dist = distance(vec3(0.0,0.0,1.0),vecNormal); 
        return (dist);
    }

    void main(void) {
        // Pretty basic lambertian lighting...
        vec4 addedLights = vec4(0.0,
                                0.0,
                                0.0,
                                1.0);
        for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
            vec3 lightDirection = normalize(vecPos
                                    - pointLights[l].position);
            addedLights.rgb += clamp(dot(-lightDirection, vecNormal), 0.0, 1.0)
                                * pointLights[l].color
                                * lightIntensity;
        }
        vec4 color = texture2D(tex_0, vUv) * addedLights;

        float facing = getFacing(1.0);
        vec3 lDirection = normalize(vecPos- pointLights[0].position);
        color += vec4(0.125,pow(facing*0.8,7.0), pow(facing,4.0)*0.75, 0.0)*clamp(dot(-lDirection, vecNormal), 0.0, 1.0);
        gl_FragColor = vec4(color);

    }