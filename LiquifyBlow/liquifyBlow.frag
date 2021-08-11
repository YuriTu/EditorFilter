precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;
uniform vec2 u_center;
uniform float u_radius;
uniform float u_strength;
uniform float u_ratio;
uniform float u_isBlow;
//放大缩小其实不需要progress ，因为他是根据上一个帧继续进行放缩的，所以process本质上是用户控制的
void main()
{
    const float basicRate = 1.0;
    const float basicStrength = 0.3;
    const float maxRadiusRate = 1.0;
    //    strength = [0,100]
    //    提供strength 给业务方， 1.0 + strength * 0.09  -> [1,10]
    float strength = 1.0 + 0.09 *  u_strength;
    vec2 UV = v_texCoord;
    vec2 ratioRate = vec2(1.0 , 1.0 / u_ratio);

    UV -= u_center;
    float dist = length(UV * ratioRate);

//    闲了测一下step和if的效率差距
    if ( dist < u_radius )
    {
        float radiusRate = dist / u_radius;
//        约靠近边缘的影响效果越小
        float edgeRadiusRate = maxRadiusRate - radiusRate;
        float targetRadius =
        radiusRate * dist + ( edgeRadiusRate * strength * sqrt(dist) );
//        这里本质上 当前的像素由谁提供，而非目前的像素要去哪
//所以说如果当前像素提供这是靠近0.99的像素，则为放大 反之1.01则为缩小
        float rate = basicRate + u_isBlow * basicStrength * targetRadius;

        UV = vec2( UV.x * rate, UV.y * rate);
    }
    UV += u_center;
    gl_FragColor = texture2D(u_image,UV);
}
