precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;
uniform vec2 u_center;
uniform float u_radius;
uniform float u_rotateStrength;
uniform float u_progress;
uniform float u_ratio;

void main()
{
    vec2 UV = v_texCoord;
//    由于radio是以width作为基准的，所以根据ratio减少height的比例长度
    vec2 ratioRate = vec2(1.0 , 1.0 / u_ratio);
    UV -= u_center;
    float Dist = length(UV * ratioRate);
    if ( Dist < u_radius)
    {
        float Percent = (u_radius - Dist) / u_radius;
        float Theta = Percent * Percent * u_progress * u_rotateStrength * 3.14159;
        float S = sin( Theta );
        float C = cos( Theta );
        UV = vec2( (dot(UV, vec2(C, -S))), dot(UV, vec2(S, C)) );
    }
    UV += u_center;
    gl_FragColor = texture2D(u_image,UV);
}
