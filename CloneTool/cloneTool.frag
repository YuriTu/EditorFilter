precision mediump float;
varying vec2 v_texCoord;
uniform sampler2D u_image;
uniform vec2 u_center;// 画笔中心
uniform float u_radius; // 画笔半径

uniform vec2 u_templateCenter;// 模板中心
uniform vec2 u_startCenter;// 开始绘制的中心点
uniform float u_hardness; // 边缘柔化

uniform float u_ratio;

void main()
{
    vec2 uv = v_texCoord;
    vec2 ratioRate = vec2(1.0, 1.0 / u_ratio);

//    uv -= u_center;
    // 矩阵偏移有点问题，后面集中处理一下
    vec2 delta = ( u_templateCenter - u_startCenter );
    uv = v_texCoord + delta;
//    uv += u_center;
    if (uv.x > 1.0 ||uv.x < 0.0 || uv.y > 1.0 || uv.y < 0.0 ) {
        gl_FragColor = vec4(0.0,0.0,0.0,0.0) ;
    } else {
        gl_FragColor = texture2D(u_image, uv);
    }
}
