uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor; // vec 3 because RGB colors
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevation;

void main(){

    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);
}