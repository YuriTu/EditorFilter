precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;
uniform vec2 u_center;
uniform float u_radius;
uniform float u_strength;
uniform vec2 u_delta;
uniform float u_ratio;

void main()
{
    vec2 UV = v_texCoord;
    vec2 ratioRate = vec2(1.0 , 1.0 / u_ratio);
    UV -= u_center;
    float dist = length(UV * ratioRate);
//    这里是smudge 别看错了
    float strengthFactor = 0.115;

//    闲了测一下step和if的效率差距
    if ( dist < u_radius )
    {
        float interpolationFactor = dist / u_radius;
//        约靠近边缘的影响效果越小
        float targetInterpolationFactor = 1.0 - interpolationFactor;
        // sqrt 中心点太多了，平缓一点
        float targetRadius = targetInterpolationFactor * strengthFactor * dist * u_strength;
        float processRate =  targetRadius / dist;
        UV = vec2( UV.x + u_delta.x * processRate, UV.y + u_delta.y * processRate);
    }
    UV += u_center;
    vec4 temp = texture2D(u_image,UV);
    if (temp.a == 0.0) {
        temp = vec4(0.0,0.0,0.0,0.0);
    } else {
        gl_FragColor = temp;
    }


}
